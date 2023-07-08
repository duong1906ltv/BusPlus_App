import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTicket, getQRCode } from '../actions/ticket'
import TicketComponent from '../components/TicketComponent'
import { Colors } from '../constants/colors'
import Loader from '../components/Loader'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function MyTicket({ navigation }) {
  const dispatch = useDispatch()
  const ticket = useSelector((state) => state.ticket)
  const { isLoading } = useSelector((state) => state.ticket)

  const [currentTicket, setCurrentTicket] = useState()
  const [currentQrCode, setCurrentQrCode] = useState()

  useEffect(() => {
    dispatch(getMyTicket())
  }, [dispatch])

  useEffect(() => {
    if (ticket && ticket.myTicket.length) {
      const currentMonth = new Date().getMonth() + 1
      var flag = false
      ticket.myTicket.map((item, index) => {
        console.log(item.month)
        if (item.month === currentMonth) {
          setCurrentTicket(item)
          setCurrentQrCode(ticket?.qrCode[index])
          flag = true
          return
        }
      })
      if (!flag) {
        setCurrentTicket(-1)
      }
    } else {
      setCurrentTicket(-1)
    }
  }, [ticket])

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      {currentTicket === -1 ? (
        <View
          style={{
            marginTop: '50%',
            alignItems: 'center',
            gap: 30,
          }}
        >
          <MaterialCommunityIcons
            name="ticket-confirmation"
            size={50}
            color="lightgray"
          />
          <Text style={{ color: 'gray', fontSize: 16 }}>
            Không có vé xe phù hợp với tháng hiện tại!
          </Text>
        </View>
      ) : (
        <TicketComponent ticket={currentTicket} qrCode={currentQrCode} />
      )}

      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('MyTicketList')
          }}
        >
          <Text style={styles.buttonText}>Vé của tôi</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('BuyTicket')
          }}
        >
          <Text style={styles.buttonText}>Mua vé</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default MyTicket

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 50,
    position: 'absolute',
    bottom: 40,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
})
