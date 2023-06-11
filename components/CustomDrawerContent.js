import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../constants/colors'
import { logout } from '../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign'

const user = {
  avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
  fullName: 'Phung Dinh Duong',
}

function CustomDrawerContent(props) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  return (
    <DrawerContentScrollView {...props}>
      {isAuthenticated ? (
        <View style={styles.userContainer}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="head">
            {user.fullName}
          </Text>
        </View>
      ) : (
        <View style={styles.userContainer}>
          <Image style={styles.avatar} source={{ uri: user.avatar }} />
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="head">
            None
          </Text>
        </View>
      )}

      <DrawerItemList {...props} />
      {isAuthenticated && (
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <AntDesign name="login" color={color} size={size} />
          )}
          onPress={() => dispatch(logout())}
        />
      )}
    </DrawerContentScrollView>
  )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
  userContainer: {
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 150,
    marginRight: 15,
  },
  username: {
    flex: 1,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
