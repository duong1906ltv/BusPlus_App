import { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTicket, getQRCode } from '../actions/ticket'
import TicketComponent from '../components/TicketComponent'
import { Colors } from '../constants/colors'

function MyTicket({ navigation }) {
  const dispatch = useDispatch()
  const ticket = useSelector((state) => state.ticket)

  useEffect(() => {
    dispatch(getMyTicket())
    dispatch(getQRCode())
  }, [dispatch])
  const ticketInfo = {
    avatar: 'https://i.redd.it/ah4sksgwvtz71.jpg',
    fullName: 'Phung Dinh Duong',
    ticketId: '0001218',
    month: '6/2023',
    userType: 'Uu tien',
    routeType: 'Lien tuyen',
    qrCode:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
  }
  console.log(ticket)

  return (
    <View style={styles.container}>
      {ticket && ticket?.myTicket[0] && (
        <TicketComponent
          ticket={ticket?.myTicket[0]}
          qrCode={ticket?.qrCode[0]}
        />
      )}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('MyTicketList')
          }}
        >
          <Text style={styles.buttonText}>My Tickets</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('BuyTicket')
          }}
        >
          <Text style={styles.buttonText}>Buy Ticket</Text>
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
