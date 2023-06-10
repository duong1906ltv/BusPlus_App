import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import MyTicket from './screens/MyTicket'
import RouteDetailScreen from './screens/RouteDetailScreen'
import RoutesLookupScreen from './screens/RoutesLookupScreen'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function Root() {
  return (
    <Drawer.Navigator initialRouteName="Map">
      <Drawer.Screen name="Map" component={HomeScreen} />
      <Drawer.Screen name="My Ticket" component={MyTicket} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BusPlus"
            component={Root}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <Button
                  title="All Routes"
                  color={tintColor}
                  onPress={() => navigation.navigate('RoutesLookupScreen')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="RoutesLookupScreen"
            component={RoutesLookupScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="RouteDetailScreen"
            component={RouteDetailScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
