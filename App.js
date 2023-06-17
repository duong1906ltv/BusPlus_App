import { Provider } from 'react-redux'
import AppStack from './navigation/AppStack'
import { SocketProvider } from './SocketContext'
import store from './store'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

export default function App() {
  return (
    <SocketProvider>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
        <Toast />
      </Provider>
    </SocketProvider>
  )
}
