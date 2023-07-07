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
  const authState = useSelector((state) => state.auth)
  return (
    <DrawerContentScrollView {...props}>
      {authState.isAuthenticated ? (
        <View style={styles.userContainer}>
          {authState.user.profile.avatar ? (
            <Image
              style={styles.avatar}
              source={{ uri: authState.user.profile.avatar }}
            />
          ) : (
            <Image
              source={{
                uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg',
              }}
              style={styles.avatar}
            />
          )}
          <Text style={styles.username} numberOfLines={1} ellipsizeMode="head">
            {authState.user.fullname}
          </Text>
        </View>
      ) : (
        <View style={styles.userContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/bus_green.png')}
          />
        </View>
      )}

      <DrawerItemList {...props} />
      {authState.isAuthenticated && (
        <DrawerItem
          label="Đăng xuất"
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
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
