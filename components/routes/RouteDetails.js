import React, { useEffect, useRef, useState } from 'react'
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native'
import { windowHeight } from '../../utils/dimensions'
import RouteDetailTabs from './RouteDetailTabs'

const RouteDetails = ({ route, schedule }) => {
  const headerHeight = 60
  const fullHeight = (screenHeight * 90) / 100
  const halfHeight = fullHeight / 2
  // console.log(fullHeight, halfHeight, headerHeight)
  const pan = useRef(new Animated.ValueXY()).current

  const [panY, setPanY] = useState(0)
  const [currentHeight, setCurrentHeight] = useState(halfHeight + panY)

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
          setPanY(0)
          pan.y.setValue(0)
          pan.y.setOffset(0)
        } else {
          setPanY(-halfHeight)
          pan.y.setValue(0)
          pan.y.setOffset(-halfHeight)
        }
      },
    })
  ).current

  useEffect(() => {
    setCurrentHeight(halfHeight - panY)
  }, [panY])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: 0 }, { translateY: panY }],
        },
        {
          height: currentHeight,
        },
      ]}
    >
      <View
        style={[styles.header, { height: headerHeight }]}
        {...panResponder.panHandlers}
      >
        <Text>{route.routeName}</Text>
      </View>
      <View style={styles.content}>
        <RouteDetailTabs route={route} schedule={schedule} />
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
    backgroundColor: 'white',
    // height: '100%',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
})
