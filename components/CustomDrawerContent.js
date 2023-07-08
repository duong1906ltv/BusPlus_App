import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Image, StyleSheet, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/auth'
import { Colors } from '../constants/colors'

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
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
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
  logoContainer: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    width: '100%',
    marginBottom: 15,
  },
  logo: {
    width: '100%',
    height: 80,
  },
})
