import React, { Component } from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native'

export class AdminNotiModal extends Component {
  render() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={false}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            this.props.setModalVisible(!this.props.modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Thông báo</Text>

              <Text style={styles.modalText}>
                Hôm nay các tuyến xe buýt không hoạt động. Sẽ có thông báo mới
                nhất khi các tuyến xe hoạt động trở lại. Xin lỗi vì sự bất tiện
                này.
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.props.setModalVisible(!this.props.modalVisible)
                }
              >
                <Text style={styles.textStyle}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default AdminNotiModal
