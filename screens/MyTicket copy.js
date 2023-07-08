import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TicketComponent from '../components/TicketComponent'
import { Colors } from '../constants/colors'
import { getMyTicket, getQRCode } from '../actions/ticket'

function MyTicket({ navigation }) {
  const dispatch = useDispatch()
  const tickets = useSelector((state) => state.tickets)

  const [currentTicket, setCurrentTicket] = useState()
  const [currentQrCode, setCurrentQrCode] = useState()

  useEffect(() => {
    dispatch(getMyTicket())
    dispatch(getQRCode())
  }, [dispatch])

  useEffect(()=> {
    if (tickets && tickets.length){
      const currentMonth = new Date().getMonth() + 1
      var flag = false
      tickets.filter.map((item, index) => {
        if (item.month === currentMonth){
          setCurrentTicket(item)
          setCurrentQrCode(tickets?.qrCode[index])
          flag = true
          return
        }
      })
      if(!flag){
        setCurrentTicket(tickets?.myTicket[0])
        setCurrentQrCode(tickets?.qrCode[0])
      }
    }
  },[tickets])
  console.log("-------------------");
  console.log("-------------------");
  console.log("-------------------");
  console.log(tickets?.myTicket);

  return (
    <View style={styles.container}>
      {tickets && tickets?.myTicket[0] && (
        <TicketComponent
          tickets={currentTicket}
          qrCode={currentQrCode}
        />
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
