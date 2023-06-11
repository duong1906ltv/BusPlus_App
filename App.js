import { Provider } from 'react-redux'
import AppStack from './navigation/AppStack'
import store from './store'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'

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
          <AppStack />
        </NavigationContainer>
      </>
    </Provider>
  )
}
