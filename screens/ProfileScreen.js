import { useEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Zocial from 'react-native-vector-icons/Zocial'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../actions/profile'
import DatePicker from '../components/DatePicker'
import InputField from '../components/auth/InputField'

function ProfileScreen() {
  const [gender, setGender] = useState('male')
  const isEditing = useSelector((state) => state.profile.isEditing)
  const profile = useSelector((state) => state.profile.profile)
  // const [birthDate, setBirthDate] = useState('');

  const [birthDate, setBirthDate] = useState()

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
          <DatePicker onChangeDate={setBirthDate} birthDate={birthDate} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#cbcbcb',
              marginBottom: 20,
              marginTop: -5,
              paddingBottom: 5,
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome
                name="transgender"
                size={20}
                color="#666"
                style={{ marginRight: 10 }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '70%',
                gap: 20,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <RadioButton
                    value="male"
                    status={gender === 'male' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('male')}
                  />
                </View>
                <View>
                  <Text>Male</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <RadioButton
                    value="female"
                    status={gender === 'female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('female')}
                  />
                </View>
                <View>
                  <Text>Female</Text>
                </View>
              </View>
            </View>
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
