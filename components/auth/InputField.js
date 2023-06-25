import React from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Colors } from '../../constants/colors'

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  setText,
  editable,
  value,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 10 }}
          onChangeText={(text) => setText(text)}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, paddingHorizontal: 10 }}
          onChangeText={(text) => (setText ? setText(text) : null)}
          editable={editable}
          value={value ? value : null}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: Colors.primary, fontWeight: '700' }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
