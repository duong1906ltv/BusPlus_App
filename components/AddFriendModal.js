import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'
import { Pressable } from 'react-native'
import { TextInput } from 'react-native'

export default class AddFriendModal extends Component {
  render() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
            this.props.setModalVisible(!this.props.modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>ADD FRIEND BY PHONE OR EMAIL</Text>
              <TextInput
                placeholder="Type phone number or email"
                // onChangeText={(text) => setText(text)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.props.setModalVisible(!this.props.modalVisible)
                }
              >
                <Text style={styles.textStyle}>Add friends</Text>
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
