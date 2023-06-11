import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import HomeScreen from './screens/HomeScreen'
import MyTicket from './screens/MyTicket'
import RouteDetailScreen from './screens/RouteDetailScreen'
import RoutesLookupScreen from './screens/RoutesLookupScreen'
import Login from './screens/Login'
import Register from './screens/Register'
import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

import { Provider, useDispatch, useSelector } from 'react-redux'
import store from './store'
import { logout } from './actions/auth'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function CustomDrawerContent(props) {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {isAuthenticated && (
        <DrawerItem label="Logout" onPress={() => dispatch(logout())} />
      )}
    </DrawerContentScrollView>
  )
}

function Root() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <Drawer.Navigator
      initialRouteName="Home Page"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home Page" component={HomeScreen} />
      <Drawer.Screen name="My Ticket" component={MyTicket} />
      <Drawer.Screen name="Routes" component={RoutesLookupScreen} />
      {!isAuthenticated && ( // Hiển thị màn hình Login và Register nếu chưa đăng nhập
        <>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </>
      )}
    </Drawer.Navigator>
  )
}

export default function App() {
  // const [location, setLocation] = useState()

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync()
  //     if (status !== 'granted') {
  //       console.log('Please grant location permissions')
  //       return
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({})
  //     setLocation(currentLocation)
  //     console.log('Location:')
  //     console.log(currentLocation)
  //   }
  //   getPermissions()
  // }, [])

  return (
    <Provider store={store}>
      <>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BusPlus"
              component={Root}
              // options={({ navigation }) => ({
              //   headerRight: ({ tintColor }) => (
              //     <Button
              //       title="All Routes"
              //       color={tintColor}
              //       onPress={() => navigation.navigate('RoutesLookupScreen')}
              //     />
              //   ),
              // })}
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
    </Provider>
  )
}
