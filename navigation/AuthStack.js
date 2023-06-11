import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import RoutesLookupScreen from '../screens/RoutesLookupScreen'

const Stack = createNativeStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RoutesLookupScreen" component={RoutesLookupScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
