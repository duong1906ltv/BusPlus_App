import { Fontisto } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { Colors } from '../constants/colors'
import HomeScreen from '../screens/HomeScreen'
import MyTicket from '../screens/MyTicket'
import RouteDetailScreen from '../screens/RouteDetailScreen'
import RoutesLookupScreen from '../screens/RoutesLookupScreen'
import { useSelector } from 'react-redux'
import LoginScreen from '../screens/Login'
import RegisterScreen from '../screens/Register'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function DrawerNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        drawerActiveBackgroundColor: '#ededed',
        drawerActiveTintColor: Colors.primary,
        drawerStyle: {
          backgroundColor: Colors.white,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'Bus Plus',
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="RoutesLookupScreen"
        component={RoutesLookupScreen}
        options={{
          headerTitle: 'Look up all routes',
          drawerLabel: 'All Routes',
          drawerIcon: ({ color, size }) => (
            <Icon name="bus" color={color} size={size} />
          ),
        }}
      />

      {!isAuthenticated ? (
        <>
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: 'Login',
              drawerLabel: 'Login',
              drawerIcon: ({ color, size }) => (
                <AntDesign name="login" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitle: 'Register',
              drawerLabel: 'Register',
              drawerIcon: ({ color, size }) => (
                <FontAwesome name="registered" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : (
        <Drawer.Screen
          name="MyTicket"
          component={MyTicket}
          options={{
            headerTitle: 'My Ticket',
            drawerLabel: 'My Ticket',
            drawerIcon: ({ color, size }) => (
              <Fontisto name="ticket" color={color} size={size} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  )
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="RouteDetailScreen"
        component={RouteDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
