import React, { useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const RouteDetails = () => {
  const { height: screenHeight } = Dimensions.get('window')
  const headerHeight = 60
  const fullHeight = (screenHeight * 96) / 100
  const halfHeight = fullHeight / 2
  // console.log(fullHeight, halfHeight, headerHeight)

  const pan = useRef(new Animated.ValueXY()).current

  const [panY, setPanY] = useState(0)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        setPanY(pan.y._value + pan.y._offset)
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, gestureState)
      },

      onPanResponderRelease: (_, gestureState) => {
        pan.extractOffset()
        const pY = pan.y._value + pan.y._offset
        if (pY > halfHeight / 2) {
          setPanY(halfHeight - headerHeight)
          pan.y.setValue(0)
          pan.y.setOffset(halfHeight - headerHeight)
        } else if (pY > -halfHeight / 2) {
          console.log(0)
          setPanY(0)
          pan.y.setValue(0)
          pan.y.setOffset(0)
        } else {
          console.log(-1)
          setPanY(-halfHeight)
          pan.y.setValue(0)
          pan.y.setOffset(-halfHeight)
        }
      },
    })
  ).current

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: 0 }, { translateY: panY }],
        },
      ]}
    >
      <View
        style={[styles.header, { height: headerHeight }]}
        {...panResponder.panHandlers}
      >
        <Text>Header</Text>
      </View>
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
    </Animated.View>
  )
}

export default RouteDetails

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
