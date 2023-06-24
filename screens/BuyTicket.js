import { Picker } from '@react-native-picker/picker'
import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RadioButton } from 'react-native-paper'
import { Colors } from '../constants/colors'

const BuyTicket = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Buy Ticket',
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
    })
  }, [navigation])

  const [userType, setUserType] = useState('binh-thuong')
  const [routeType, setRouteType] = useState('don-tuyen')
  const [selectedMonth, setSelectedMonth] = useState()
  const monthOptions = [
    '06/2023',
    '07/2023',
    '08/2023',
    '09/2023',
    '10/2023',
    '11/2023',
    '12/2023',
    '01/2024',
    '02/2024',
    '03/2024',
    '04/2024',
    '05/2024',
    '06/2024',
  ]

  const [selectedRoute, setSelectedRoute] = useState('Kim Liên - CĐ Việt Hàn')

  const routeList = ['Kim Liên - CĐ Việt Hàn', 'Huế - Đà Nẵng']

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Đối tượng</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.radioInputContainer}>
            <RadioButton
              value="binh-thuong"
              status={userType === 'binh-thuong' ? 'checked' : 'unchecked'}
              onPress={() => setUserType('binh-thuong')}
            />
            <Text>Bình thường</Text>
          </View>
          <View style={styles.radioInputContainer}>
            <RadioButton
              value="uu-tien"
              status={userType === 'uu-tien' ? 'checked' : 'unchecked'}
              onPress={() => setUserType('uu-tien')}
            />
            <Text>Ưu tiên</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Loại tuyến</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.radioInputContainer}>
            <RadioButton
              value="lien-tuyen"
              status={routeType === 'lien-tuyen' ? 'checked' : 'unchecked'}
              onPress={() => setRouteType('lien-tuyen')}
            />
            <Text>Liên tuyến</Text>
          </View>
          <View style={styles.radioInputContainer}>
            <RadioButton
              value="don-tuyen"
              status={routeType === 'don-tuyen' ? 'checked' : 'unchecked'}
              onPress={() => setRouteType('don-tuyen')}
            />
            <Text>Đơn tuyến</Text>
          </View>
        </View>
      </View>
      {routeType === 'don-tuyen' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <View style={[styles.pickerContainer, { width: '70%' }]}>
            <Picker
              selectedValue={selectedRoute}
              style={{
                height: 50,
                width: '100%',
                backgroundColor: 'transparent',
              }}
              onValueChange={(route, itemIndex) => setSelectedRoute(route)}
            >
              {routeList.length &&
                routeList.map((route) => (
                  <Picker.Item label={route} value={route} key={route} />
                ))}
            </Picker>
          </View>
        </View>
      )}
      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tháng</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMonth}
            style={{
              height: 50,
              width: 150,
              backgroundColor: 'transparent',
            }}
            onValueChange={(month, itemIndex) => setSelectedMonth(month)}
          >
            {monthOptions.length &&
              monthOptions.map((month) => (
                <Picker.Item label={month} value={month} key={month} />
              ))}
          </Picker>
        </View>
      </View>
      <View style={styles.ticketPriceContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Giá vé</Text>
        </View>
        <View>
          <Text style={styles.ticketPrice}>
            {userType === 'binh-thuong'
              ? routeType === 'lien-tuyen'
                ? '130.000'
                : '120.000'
              : routeType === 'lien-tuyen'
              ? '65.000'
              : '60.000'}
          </Text>
        </View>
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Mua vé</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BuyTicket

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    width: '30%',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbdbdb',
    borderRadius: 5,
    height: 40,
  },
  ticketPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ticketPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: 'green',
  },
  submitButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  submitButtonText: {
    fontSize: 18,
    color: Colors.white,
  },
})
