import { useEffect } from 'react'
import { Text, View } from 'react-native'
import { getAllRoutes } from '../../services/api'

function AllRoutes() {
  useEffect(() => {
    const fetchAllRoutes = async () => {
      try {
        const response = await getAllRoutes()
        console.log('hello')
        const allRoutes = response.data
        console.log(allRoutes)
      } catch (error) {
        // Handle the error
        console.log(error)
      }
    }

    fetchAllRoutes()
  }, [])

  return (
    <View>
      <Text>Call all routes API</Text>
    </View>
  )
}

export default AllRoutes
