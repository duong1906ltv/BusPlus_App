import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import RouteLookupItem from '../components/routes/RouteLookupItem'
import { getRoutesInformationApi } from '../services/api'

function RoutesLookupScreen({ navigation }) {
  const [routesInfo, setRoutesInfo] = useState([])

  useEffect(() => {
    const fetchRoutesInfo = async () => {
      try {
        const response = await getRoutesInformationApi()
        setRoutesInfo(response.data)
      } catch (error) {
        // Handle the error
        console.log(error)
      }
    }

    fetchRoutesInfo()
  }, [])

  function renderRouteLookupItem(itemData) {
    function pressHandler() {
      navigation.navigate('RouteDetailScreen', {
        routeNumber: itemData.item.routeNumber,
      })
    }

    return (
      <RouteLookupItem
        routeName={itemData.item.routeName}
        routeNumber={itemData.item.routeNumber}
        cost={itemData.item.cost}
        onPress={pressHandler}
      />
    )
  }

  return <FlatList data={routesInfo} renderItem={renderRouteLookupItem} />
}

export default RoutesLookupScreen
