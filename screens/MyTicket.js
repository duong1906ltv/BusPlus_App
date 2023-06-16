import { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTicket, getQRCode } from '../actions/ticket'

function MyTicket() {
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

  return (
    <View style={styles.container}>
      <View style={[styles.item, styles.imageContainer]}>
        <Image
          style={styles.avatar}
          source={{ uri: ticket?.myTicket[0].user.profile.avatar }}
        />
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Full Name: </Text>
        <Text style={styles.content}>
          {ticket?.myTicket[0].user.profile.fullname}
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Ticket ID: </Text>
        <Text style={styles.content}>{ticket?.myTicket[0].ticketCode}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Month: </Text>
        <Text style={styles.content}>{ticket?.myTicket[0].month}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>User Type: </Text>
        <Text style={styles.content}>{ticket?.myTicket[0].priority}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>Route Type: </Text>
        <Text style={styles.content}>{ticket?.myTicket[0].ticketType}</Text>
      </View>
      <View style={[styles.item, styles.imageContainer]}>
        <Image style={styles.qrCode} source={{ uri: ticket.qrCode[0] }} />
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
  item: {
    width: '100%',
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    width: '70%',
    fontSize: 16,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginVertical: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
})
