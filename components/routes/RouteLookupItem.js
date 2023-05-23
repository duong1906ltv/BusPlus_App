import { Pressable, StyleSheet, Text, View } from 'react-native'

function RouteLookupItem({ routeName, routeNumber, cost, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: '#ccc' }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{routeNumber}</Text>
          <Text style={styles.name}>{routeName}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default RouteLookupItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    elevation: 4,
    backgroundColor: 'white',
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontSize: 16,
  },
})
