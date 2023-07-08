import { Picker } from '@react-native-picker/picker'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../constants/colors'
import { WebView } from 'react-native-webview'
import queryString from 'query-string'
import creatPaymentIntent from '../services/stripeApis'
import paypalApi from '../services/paypalApi'
import { CheckBox, Icon } from '@rneui/themed'

const BuyTicket = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Buy Ticket',
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
    })
  }, [navigation])

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
  const [userType, setUserType] = useState('Binh thuong')
  const [routeType, setRouteType] = useState('Don tuyen')
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0])

  const [selectedRoute, setSelectedRoute] = useState('Kim Liên - CĐ Việt Hàn')

  const routeList = [
    'Kim Liên - CĐ Việt Hàn',
    'Vũng Thùng - Công viên 29/3 - Công viên Biển Đông',
    'Bến xe Trung tâm – Khu du lịch Non Nước',
    'Cảng Sông Hàn - Hòa Tiến',
    'Cảng Sông Hàn – TTHC huyện Hòa Vang',
    'Bến xe Trung tâm – Thọ Quang',
  ]

  const [isLoading, setLoading] = useState(false)
  const [paypalUrl, setPaypalUrl] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [showRouteModal, setShowRouteModal] = useState(false)
  const [showMonthModal, setShowMonthModal] = useState(false)
  const [ticketCost, setTicketCost] = useState('')
  const [description, serDescription] = useState('')
  useEffect(() => {
    {
      if (userType === 'Binh thuong' && routeType === 'Lien tuyen') {
        setTicketCost(130000)
      } else if (userType === 'Binh thuong' && routeType !== 'Lien tuyen') {
        setTicketCost(120000)
      } else if (userType !== 'Binh thuong' && routeType !== 'Lien tuyen') {
        setTicketCost(60000)
      } else {
        setTicketCost(50000)
      }
      serDescription(userType + ' - ' + routeType)
    }
  }, [userType, routeType])
  const onDone = async () => {
    let apiData = {
      amount: 500,
      currency: 'INR',
    }

    try {
      const res = await creatPaymentIntent(apiData)
      console.log('payment intent create succesfully...!!!', res)

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = await confirmPayment(
          res?.data?.paymentIntent,
          { paymentMethodType: 'Card' }
        )
        console.log('confirmPaymentIntent res++++', confirmPaymentIntent)
        alert('Payment succesfully...!!!')
      }
    } catch (error) {
      console.log('Error rasied during payment intent', error)
    }
  }

  const onPressPaypal = async () => {
    setLoading(true)
    try {
      const token = await paypalApi.generateToken()
      const res = await paypalApi.createOrder(token, ticketCost, description)
      setAccessToken(token)
      setLoading(false)
      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel == 'approve')
        setPaypalUrl(findUrl.href)
      }
    } catch (error) {
      console.log('error', error)
      setLoading(false)
    }
  }

  const onUrlChange = (webviewState) => {
    console.log('webviewStatewebviewState', webviewState)
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState()
      return
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url)
      console.log('my urls value', urlValues)
      const { token } = urlValues.query
      if (!!token) {
        paymentSucess(token)
      }
    }
  }

  const clearPaypalState = () => {
    setPaypalUrl(null)
    setAccessToken(null)
  }

  const paymentSucess = async (id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken)
      console.log('capturePayment res++++', res)
      alert('Payment sucessfull...!!!')
      clearPaypalState()
    } catch (error) {
      console.log('error raised in payment capture', error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Đối tượng</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.radioInputContainer}>
            <CheckBox
              checked={userType === 'Binh thuong' ? true : false}
              onPress={() => setUserType('Binh thuong')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Bình thường</Text>
          </View>
          <View style={styles.radioInputContainer}>
            <CheckBox
              checked={userType === 'uu-tien' ? true : false}
              onPress={() => setUserType('uu-tien')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
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
            <CheckBox
              checked={routeType === 'Lien tuyen' ? true : false}
              onPress={() => setRouteType('Lien tuyen')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Liên tuyến</Text>
          </View>
          <View style={styles.radioInputContainer}>
            <CheckBox
              checked={routeType === 'Don tuyen' ? true : false}
              onPress={() => setRouteType('Don tuyen')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Đơn tuyến</Text>
          </View>
        </View>
      </View>
      {routeType === 'Don tuyen' && (
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Tuyến xe</Text>
          </View>
          <View style={styles.pickerContainer}>
            <View style={styles.selectBoxContainer}>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setShowRouteModal(true)}
              >
                <Text>{selectedRoute}</Text>
                <Icon size={15} name="caret-down-sharp" type="ionicon" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={styles.inputGroup}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Tháng</Text>
        </View>
        <View style={[styles.pickerContainer]}>
          <View style={styles.selectBoxContainer}>
            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setShowMonthModal(true)}
            >
              <Text>{selectedMonth}</Text>
              <Icon size={15} name="caret-down-sharp" type="ionicon" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.ticketPriceContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Giá vé</Text>
        </View>
        <View>
          <Text style={styles.ticketPrice}>{ticketCost}</Text>
        </View>
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity onPress={onPressPaypal}>
          <View style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Mua vé</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal isVisible={!!paypalUrl}>
        <TouchableOpacity onPress={clearPaypalState} style={{ margin: 24 }}>
          <Text>Closed</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: paypalUrl }}
            onNavigationStateChange={onUrlChange}
          />
        </View>
      </Modal>
      <Modal
        isVisible={showRouteModal}
        style={styles.modal}
        onBackdropPress={() => setShowRouteModal(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTextHeader}>Chọn tuyến </Text>
          {routeList.map((route) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedRoute(route)
                setShowRouteModal(false)
              }}
            >
              <Text style={styles.modalText}>{route}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
        isVisible={showMonthModal}
        style={styles.modal}
        onBackdropPress={() => setShowMonthModal(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
      >
        <View style={{ ...styles.modalContent, height: 300 }}>
          <Text style={styles.modalTextHeader}>Chọn vé tháng</Text>
          <ScrollView>
            {monthOptions.map((month) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedMonth(month)
                  setShowMonthModal(false)
                }}
              >
                <Text style={styles.modalText}>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

export default BuyTicket

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    gap: 20,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    width: '25%',
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
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    height: 40,
    width: '70%',
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
  selectBoxContainer: {
    borderRadius: 5,
    width: '100%',
  },
  selectBox: {
    flexDirection: 'row',
    padding: 7,
    justifyContent: 'space-between',
  },
  modal: {
    overflow: 'scroll',
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    overflow: 'scroll',
    backgroundColor: 'white',
    height: 150,
    padding: 16,
  },
  modalTextHeader: {
    fontSize: 16,
    color: Colors.gray700,
    padding: 10,
  },
  modalText: {
    fontSize: 16,
    padding: 10,
  },
})
