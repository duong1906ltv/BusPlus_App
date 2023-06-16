import React, { useState } from 'react'
import { Image, ScrollView, View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Zocial from 'react-native-vector-icons/Zocial'
import InputField from '../components/auth/InputField'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from '../actions/profile'
import { RadioButton } from 'react-native-paper'

function ProfileScreen() {
  const [checked, setChecked] = React.useState('second')
  const isEditing = useSelector((state) => state.profile.isEditing)
  const profile = useSelector((state) => state.profile.profile)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={require('../assets/images/bus_green.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <InputField
            label={'Full name'}
            icon={
              <FontAwesome
                name="user-o"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            value={profile?.fullname}
            editable={isEditing}
            keyboardType="email-address"
          />
          <InputField
            label={'BirthDay'}
            icon={
              <FontAwesome
                name="calendar"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            editable={isEditing}
          />
          {/* <InputField
            label={'Gender'}
            icon={
              <FontAwesome
                name="transgender"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            editable={isEditing}
          /> */}
          <View>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
              testID="Male"
            />
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('second')}
            />
          </View>
          <InputField
            label={'Phone numer'}
            icon={
              <FontAwesome
                name="phone"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            editable={isEditing}
            value={profile?.phone}
          />
          <InputField
            label={'Email'}
            icon={
              <Zocial
                name="email"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            editable={isEditing}
            value={profile?.email}
          />
          <InputField
            label={'Address'}
            icon={
              <FontAwesome
                name="address-card-o"
                size={20}
                color="#666"
                style={{ marginRight: 5 }}
              />
            }
            keyboardType="email-address"
            editable={isEditing}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 50,
  },
  avatar: {
    // borderColor: Colors.Yellow,
    // borderWidth: 2,
    width: 300,
    height: 300,
    borderRadius: 150,
    resizeMode: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    paddingHorizontal: 25,
  },
})

export default ProfileScreen
