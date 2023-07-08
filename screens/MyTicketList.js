import { useEffect, useLayoutEffect } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMyTicket, getQRCode } from '../actions/ticket'
import { Colors } from '../constants/colors'
import { convertToDong } from '../helpers'

function MyTicketList({ navigation }) {
  const dispatch = useDispatch()
  const ticket = useSelector((state) => state.ticket)

  useEffect(() => {
    dispatch(getMyTicket())
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Tickets',
      headerStyle: { backgroundColor: Colors.primary },
      headerTintColor: Colors.white,
    })
  }, [navigation])

  const FlatListItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={[styles.imageContainer]}>
          <Image style={styles.qrCode} source={{ uri: ticket.qrCode[index] }} />
        </View>
        <View style={styles.itemInfo}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Vé xe tháng:</Text>
            <Text style={styles.content}>{item?.month + "/" + item?.year}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Ticket ID</Text>
            <Text style={styles.content}>{item.ticketCode}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Loại vé xe: </Text>
            <Text style={styles.content}>{item?.ticketType.priority + " - " + item?.ticketType.routeType}</Text>
          </View>
          {
            item?.description &&
            <View style={styles.infoContainer}>
              <Text style={styles.title}>Tuyến xe: </Text>
              <Text style={styles.content}>{item?.description}</Text>
            </View>
          }
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Giá vé: </Text>
            <Text style={styles.content}>{convertToDong(item.ticketType?.cost)}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.list}>
      {ticket && ticket?.myTicket ? (
        <FlatList
          data={ticket?.myTicket}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />
          }}
          style={{ flex: 1, backgroundColor: '#f6f5f5' }}
        />
      ) : (
        <Text>No tickets</Text>
      )}
    </View>
  )
}

export default MyTicketList

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.white,
    marginBottom: 30,
    flexDirection: 'row',
    gap: 15,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  qrCode: {
    width: 80,
    height: 80,
  },
  itemInfo: { gap: 2 },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    width: '70%',
    fontSize: 14,
  },
})
