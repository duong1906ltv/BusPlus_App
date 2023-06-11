import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AppStack from './navigation/AppStack'
// import AuthStack from './navigation/AuthStack'

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <AppStack />
        {/* <AuthStack /> */}
      </NavigationContainer>
    </>
  )
}
