import { Image, StyleSheet, Text, View } from 'react-native'

function TicketComponent({ ticket, qrCode }) {
  return (
    <>
      {ticket && (
        <View style={styles.container}>
          <View style={[styles.item, styles.imageContainer]}>
            <Image
              style={styles.avatar}
              source={{ uri: ticket?.user?.profile?.avatar }}
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Full Name: </Text>
            <Text style={styles.content}>
              {ticket?.user?.profile?.fullname}
            </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Ticket ID: </Text>
            <Text style={styles.content}>{ticket?.ticketCode}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Month: </Text>
            <Text style={styles.content}>{ticket?.month}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>User Type: </Text>
            <Text style={styles.content}>{ticket?.priority}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>Route Type: </Text>
            <Text style={styles.content}>{ticket?.ticketType}</Text>
          </View>
          <View style={[styles.item, styles.imageContainer]}>
            <Image style={styles.qrCode} source={{ uri: qrCode }} />
          </View>
        </View>
      )}
    </>
  )
}

export default TicketComponent

const styles = StyleSheet.create({
  container: {},
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
