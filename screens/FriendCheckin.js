import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getListNoti } from '../actions/noti'
import NotiListTabs from '../components/NotiListTab'
import { useIsFocused } from '@react-navigation/native'

function FriendCheckin() {
  const { listNoti } = useSelector((state) => state.noti)
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  useEffect(() => {
    dispatch(getListNoti())
  }, [dispatch, isFocused])

  return (
    <View style={styles.container}>
      {listNoti && <NotiListTabs notiList={listNoti} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    alignItems: 'center',
  },
})

export default FriendCheckin
