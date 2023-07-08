import { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../constants/colors'
import { WebView } from 'react-native-webview';
import queryString from 'query-string';
import paypalApi from '../services/paypalApi'
import { CheckBox, Icon } from '@rneui/themed'
import { selectUser } from '../reducers/auth';
import { createTicket } from '../actions/ticket';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRoutesApi } from '../services/api';
import { convertToDong } from '../helpers';
import { getAllTicketType } from '../actions/ticketType';
import { selectTicketType } from '../reducers/ticketType';
import { createTransaction } from '../actions/transaction';
const PRIORITY = "Ưu tiên"
const NORMAL = "Bình thường"
const SINGLE = "Đơn tuyến"
const MULTIPLE = "Liên tuyến"

const BuyTicket = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Mua vé xe tháng',
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
    })
  }, [navigation])

  const monthOptions = [
    '07/2023',
    '08/2023',
    '09/2023',
    '10/2023',
    '11/2023',
    '12/2023',
  ]
  const [priority, setPriority] = useState(NORMAL)
  const [routeType, setRouteType] = useState(SINGLE)
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0])
  const user = useSelector(selectUser)
  const ticketTypes = useSelector(selectTicketType)

  const [selectedRoute, setSelectedRoute] = useState({})

  const [paypalUrl, setPaypalUrl] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState({})


  const [routes, setRoutes] = useState([])

  const getAllRoute = async () => {
    try {
      const response = await getAllRoutesApi()
      setRoutes(response.data)
      setSelectedRoute(response.data[0])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllRoute()
    dispatch(getAllTicketType())
  }, [])


  useEffect(()=>{
    {
      if (ticketTypes.length){
        const ticketType = ticketTypes.filter(item => item.priority === priority && item.routeType === routeType)
        if(ticketType){
          setSelectedTicketType(ticketType[0])
        }
      }
    }
  }, [priority, routeType, ticketTypes])

  const handleCreateTicket = () => {
    const ticket = {
      ticketType: selectedTicketType,
      description: selectedRoute.routeName,
      month: parseInt(selectedMonth.split("/")[0]),
      year: parseInt(selectedMonth.split("/")[1]),
    }
    dispatch(createTicket(ticket))
  }

  const handleCreateTransaction = () => {
    const transaction = {
      amount: selectedTicketType.cost,
      description: `${priority} - ${routeType} - ${selectedRoute.routeName}`,
    }
    dispatch(createTransaction(transaction))
  }

  const onPressPaypal = async () => {
    try {
      const description = `Mua vé tháng ${selectedMonth}: ${priority} - ${routeType} - ${selectedRoute.routeName}`

      const token = await paypalApi.generateToken()
      const res = await paypalApi.createOrder(token, selectedTicketType.cost, description)
      setAccessToken(token)
      if (!!res?.links) {
        const findUrl = res.links.find((data) => data?.rel == 'approve')
        setPaypalUrl(findUrl.href)
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const onUrlChange = (webviewState) => {
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState()
      return
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url)
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
  const dispatch = useDispatch()
  const paymentSucess = async (id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken)
      alert("Payment sucessfull")
      handleCreateTicket()
      handleCreateTransaction()
      clearPaypalState()
      navigation.goBack()
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
              checked={priority === NORMAL ? true : false}
              onPress={() => setPriority(NORMAL)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Bình thường</Text>
          </View>
          <View style={styles.radioInputContainer}>
            <CheckBox
              checked={priority === PRIORITY ? true : false}
              onPress={() => setPriority(PRIORITY)}
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
              checked={routeType === MULTIPLE ? true : false}
              onPress={() => setRouteType(MULTIPLE)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Liên tuyến</Text>
          </View>
          <View style={styles.radioInputContainer}>
            <CheckBox
              checked={routeType === SINGLE ? true : false}
              onPress={() => setRouteType(SINGLE)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
            <Text>Đơn tuyến</Text>
          </View>
        </View>
      </View>
      {routeType === SINGLE && (
        <View style={styles.inputGroup} >
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Tuyến xe</Text>
          </View>
          <View style={styles.pickerContainer}>
            <View style={styles.selectBoxContainer} >
              <TouchableOpacity style={styles.selectBox} onPress={() => setShowRouteModal(true)}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{ width: 220 }}>{selectedRoute.routeName}</Text>
                <Icon size={15}name="caret-down-sharp" type="ionicon" />
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
          <Text style={styles.ticketPrice}>{convertToDong(selectedTicketType.cost)}</Text>
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
        <View style={{ ...styles.modalContent, height: 320 }}>
          <Text style={styles.modalTextHeader}>Chọn tuyến </Text>
          <ScrollView>
          {
            routes.map(route => (
              <TouchableOpacity onPress={() => {
                setSelectedRoute(route)
                setShowRouteModal(false)
              }
              }>
                <Text style={styles.modalText}>{route.routeName}</Text>
              </TouchableOpacity>
            ))
          }
          </ScrollView>
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
