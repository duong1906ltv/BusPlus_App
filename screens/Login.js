import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Zocial from 'react-native-vector-icons/Zocial'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialIcons'

import CustomButton from '../components/auth/CustomButton'
import InputField from '../components/auth/InputField'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '../actions/auth.js'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    dispatch(login({ email, password }))
  }

  // if (loading) {
  //   // return <div>Loading...</div>
  //   console.log(state.auth)
  // }

  // if (error) {
  //   // return <div>Error: {error}</div>
  //   console.log(error)
  // }

  if (isAuthenticated) {
    navigation.navigate('HomeScreen')
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/bus_green.png')}
            style={{ width: 200, height: 200 }}
          />
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
            }}
          >
            Welcome to BusPlus
          </Text>
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          setText={setEmail}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          setText={setPassword}
          inputType="password"
          fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
        />

        <CustomButton label={'Login'} onPress={handleLogin} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Zocial name="gmail" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Icon name="facebook" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FontAwesome name="phone" size={24} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  loading: state.auth.loading,
  error: state.auth.error,
})

export default LoginScreen
