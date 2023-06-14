import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'

export default function CustomButton({ isLoading, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: Colors.primary,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {/* <ActivityIndicator
          style={{
            position: 'absolute',
            alignSelf: 'center',
            right: '50%',
          }}
          size={100}
          color={'white'}
        /> */}

        <Text
          style={{
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 16,
            color: '#fff',
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
