import {
  Text,
  View,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native'
import React, { Component } from 'react'
import FontAweSome from 'react-native-vector-icons/FontAwesome'

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
              <Pressable
                onPress={() => {
                  this.props.setPhone('')
                  this.props.setModalVisible(false)
                }}
                style={{
                  alignItems: 'center',
                  marginLeft: 'auto',
                }}
              >
                <FontAweSome name="close" size={30}></FontAweSome>
              </Pressable>
              <View>
                <Text style={styles.modalText}>
                  Thêm bạn bè bằng số điện thoại{' '}
                </Text>
              </View>
              {this.props.phone ? (
                <TextInput
                  value={this.props.phone}
                  style={{ textAlign: 'center' }}
                  onChangeText={(text) => this.props.setPhone(text)}
                />
              ) : (
                <TextInput
                  placeholder="Nhập số điện thoại bạn bè ở đây"
                  style={{ textAlign: 'center' }}
                  onChangeText={(text) => this.props.setPhone(text)}
                />
              )}

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={
                  this.props.phone
                    ? () => {
                        this.props.setPhone('')
                        this.props.handleAddFriend()
                        this.props.setModalVisible(!this.props.modalVisible)
                      }
                    : () => {
                        this.props.setModalVisible(!this.props.modalVisible)
                      }
                }
              >
                <Text style={styles.textStyle}>Thêm bạn bè</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    marginTop: 20,
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
