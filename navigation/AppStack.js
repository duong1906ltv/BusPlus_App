import { Fontisto } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { editProfileButtonClick } from '../actions/profile'
import CustomDrawerContent from '../components/CustomDrawerContent'
import { Colors } from '../constants/colors'
import BuyTicket from '../screens/BuyTicket'
import FriendScreen from '../screens/FriendScreen'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/Login'
import MyTicket from '../screens/MyTicket'
import MyTicketList from '../screens/MyTicketList'
import NotificationScreen from '../screens/NotificationScreen'
import ProfileScreen from '../screens/ProfileScreen'
import RegisterScreen from '../screens/Register'
import RouteDetailScreen from '../screens/RouteDetailScreen'
import RoutesLookupScreen from '../screens/RoutesLookupScreen'
import TicketInfo from '../screens/TicketInfo'

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()

function DrawerNavigator({ navigation }) {
  const dispatch = useDispatch()
  const isEditing = useSelector((state) => state.profile.isEditing)
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
        <>
          <Drawer.Screen
            name="Notification"
            component={NotificationScreen}
            options={{
              headerTitle: 'Notification',
              drawerLabel: 'Notification',
              drawerIcon: ({ color, size }) => (
                <Icon name="notifications" color={color} size={size} />
              ),
            }}
          />
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
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerTitle: 'Profile',
              drawerLabel: 'Profile',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => dispatch(editProfileButtonClick())}
                >
                  {!isEditing ? (
                    <View style={{ marginRight: 20 }}>
                      <AntDesign name="edit" color={Colors.white} size={25} />
                    </View>
                  ) : (
                    <View style={{ marginRight: 20 }}>
                      <AntDesign name="check" color={Colors.white} size={25} />
                    </View>
                  )}
                </TouchableOpacity>
              ),
              drawerIcon: ({ color, size }) => (
                <AntDesign name="profile" color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Friend"
            component={FriendScreen}
            options={{
              headerTitle: 'Friend',
              drawerLabel: 'Friend',
              drawerIcon: ({ color, size }) => (
                <FontAwesome5 name="user-friends" color={color} size={size} />
              ),
            }}
          />
        </>
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
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="MyTicketList"
        component={MyTicketList}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="TicketInfo"
        component={TicketInfo}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BuyTicket"
        component={BuyTicket}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  )
}

export default AppStack
