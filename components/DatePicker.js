import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { DatePickerModal } from 'react-native-paper-dates'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function DatePicker({ onChangeDate, birthDate }) {
  const [date, setDate] = React.useState(birthDate)
  const [open, setOpen] = React.useState(false)

  const onDismissSingle = React.useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false)
      onChangeDate(params.date)
      setDate(params.date)
    },
    [setOpen, setDate]
  )

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#cbcbcb',
        marginBottom: 20,
        paddingBottom: 15,
      }}
    >
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <FontAwesome
              name="calendar"
              size={20}
              color="#666"
              style={{ marginRight: 15 }}
            />
          </View>
          <View>
            <Text style={{ color: '#666' }}>
              {birthDate ? `${birthDate}` : 'Birth date'}{' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <SafeAreaProvider>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
      </SafeAreaProvider>
    </View>
  )
}
