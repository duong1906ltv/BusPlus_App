import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { en, registerTranslation } from 'react-native-paper-dates'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Provider } from 'react-redux'
import { SocketProvider } from './SocketContext'
import AppStack from './navigation/AppStack'
import store from './store'
registerTranslation('en', en)

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
