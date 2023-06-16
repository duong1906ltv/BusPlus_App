import { View, Text, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import queryString from 'query-string'

const BuyTicket = () => {
  //   const onPress = () => {
  //     const paymentUrl = 'momo://app'
  //     //   'momo://app?action=payWithApp&partnerCode=MOMO&partnerName=Test&storeId=MoMoTestStore&orderId=MM1540456472575'
  //     console.log('OD' + Date.now().toString())
  //     const queryParams = {
  //       action: 'payWithApp',
  //       partnerCode: 'MOMOBKUN20180529',
  //       orderId: 'OD' + Date.now().toString(),
  //       requestId: 'RE1686882670415',
  //       amount: 10000,
  //       resultCode: 0,
  //       message: 'Successful.',
  //       responseTime: 1686907871685,
  //     }
  //     const redirectUrl = `${paymentUrl}?${queryString.stringify(queryParams)}`
  //     Linking.openURL(redirectUrl)
  //       .then(() => {
  //         console.log('Redirected to MoMo payment page successfully')
  //       })
  //       .catch((error) => {
  //         console.error('Failed to redirect to MoMo payment page:', error)
  //       })
  //   }
  const createPaymentUrl = () => {
    // Tạo thông tin đơn hàng
    const orderId = 'MM1540456472575'
    const amount = 150000
    const orderInfo = 'SDK team.'
    const signature =
      'fd37abbee777e13eaa0d0690d184e4d7e2fb43977281ab0e20701721f07a0e07'

    // Tạo URL thanh toán
    const paymentUrl = `https://test-payment.momo.vn/gw_payment/transactionProcessor?partnerCode=MOMO&accessKey=test_access_key&requestId=${orderId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&returnUrl=https://your-redirect-url.com&notifyUrl=https://your-notify-url.com&extraData=&requestType=captureMoMoWallet&signature=${signature}`

    return paymentUrl
  }

  const redirectToMoMoApp = () => {
    // Tạo URL thanh toán
    const paymentUrl = createPaymentUrl()

    // Mở URL thanh toán trong ứng dụng MoMo
    Linking.openURL(paymentUrl).catch((error) => {
      console.log('Lỗi khi mở ứng dụng MoMo:', error)
    })
  }

  // Gọi hàm redirectToMoMoApp khi người dùng chọn thanh toán

  return (
    <View>
      <TouchableOpacity onPress={redirectToMoMoApp}>
        <Text>BuyTicket</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BuyTicket
