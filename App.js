import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet } from 'react-native'
import { Colors } from './constants/colors'
import HomeScreen from './screens/HomeScreen'
import RouteDetailScreen from './screens/RouteDetailScreen'
import RoutesLookupScreen from './screens/RoutesLookupScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: { backgroundColor: Colors.accent500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.white },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
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
              animation: 'fade',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
