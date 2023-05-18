import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { Button, StyleSheet } from 'react-native'
import { Colors } from './constants/colors'
import HomeScreen from './screens/HomeScreen'
import RouteDetailScreen from './screens/RouteDetailScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.accent500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <Button
                  title="Route Detail"
                  color={tintColor}
                  onPress={() => navigation.navigate('RouteDetailScreen')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="RouteDetailScreen"
            component={RouteDetailScreen}
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
