import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { selectBusStation } from '../../reducers/map'
import { selectFoundRoute, selectSuggestedRoute } from '../../reducers/route'
import { getFullDetailDirection } from '../../utils/mapUtils'

export const busStationIcon = '../../assets/images/orange_icon_bus_station.png'

export const orangeBusStationIcon =
  '../../assets/images/orange_icon_bus_station.png'

export const blueBusStationIcon =
  '../../assets/images/blue_icon_bus_station.png'

export const locationIcon = '../../assets/images/icon_location.png'

export const pointIcon = '../../assets/images/icon_points.png'

export const busIcon = '../../assets/images/bus_orange.png'

function Map({ coordinates, stations, children, busStation, checkinLocation }) {
  const navigation = useNavigation()
  const [zoomLevel, setZoomLevel] = useState(null)
  const foundRoute = useSelector(selectFoundRoute)
  const suggestedRoute = useSelector(selectSuggestedRoute)
  const originState = useSelector(selectBusStation)

  const region = {
    latitude: 16.0738355 - 0.01,
    longitude: 108.145475,
    latitudeDelta: 0.04,
    longitudeDelta: 0.02,
  }

  const handleRegionChangeComplete = (region) => {
    setZoomLevel(region.latitudeDelta)
  }

  const [walkingCoordinates, setWalkingCoordinates] = useState([])
  const getWalkingDirection = async (data, color) => {
    const results = await getFullDetailDirection(data)
    const direction = {
      coordinates: results,
      color: color,
    }
    setWalkingCoordinates((walkingCoordinates) => [
      ...walkingCoordinates,
      direction,
    ])
  }
  useEffect(() => {
    if (suggestedRoute) {
      suggestedRoute.map((route) => {
        const listCoordinates = route.listPoint.map((item) => {
          return item.location
        })
        getWalkingDirection(listCoordinates, route.color)
      })
    }
  }, [suggestedRoute])

  const handleSelectStation = (station) => {
    if (navigation) {
      navigation.navigate('BusNearStation', {
        station: station,
      })
    }
  }

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      // initialRegion={region}
      region={
        checkinLocation
          ? {
              latitude: checkinLocation.latitude - 0.01,
              longitude: checkinLocation.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.02,
            }
          : originState
          ? {
              latitude: originState.latitude - 0.01,
              longitude: originState.longitude,
              latitudeDelta: 0.04,
              longitudeDelta: 0.02,
            }
          : { ...region }
      }
      onRegionChangeComplete={handleRegionChangeComplete}
    >
      {zoomLevel <= 0.06 && busStation && (
        <Marker coordinate={busStation.coordinate}>
          <Image
            source={require(blueBusStationIcon)}
            style={styles.activeMarkerImage}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Marker>
      )}
      {zoomLevel <= 0.06 &&
        stations &&
        stations.map((station, index) =>
          JSON.stringify(station.coordinate) === JSON.stringify(originState) ? (
            <Marker
              coordinate={station.coordinate}
              key={index + Date.now()}
              onPress={() => handleSelectStation(station)}
            >
              <Image
                source={require(blueBusStationIcon)}
                style={styles.activeMarkerImage}
                resizeMode="center"
                resizeMethod="resize"
              />
            </Marker>
          ) : (
            <Marker
              coordinate={station.coordinate}
              key={index}
              tracksViewChanges={false}
              onPress={() => handleSelectStation(station)}
            >
              <Image
                source={require(orangeBusStationIcon)}
                style={styles.markerImage}
                resizeMode="center"
                resizeMethod="resize"
              />
            </Marker>
          )
        )}
      {foundRoute.original && (
        <Marker coordinate={foundRoute.original.location}>
          <Image
            source={require(pointIcon)}
            style={styles.markerImage}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Marker>
      )}
      {foundRoute.destination && (
        <Marker coordinate={foundRoute.destination.location}>
          <Image
            source={require(locationIcon)}
            style={styles.markerImage}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Marker>
      )}
      {coordinates && (
        <Polyline
          coordinates={coordinates}
          strokeWidth={5}
          strokeColor="orange"
        />
      )}
      {walkingCoordinates.length ? (
        walkingCoordinates.map((data) =>
          data.color === 'gray' ? (
            <Polyline
              coordinates={data.coordinates}
              strokeWidth={5}
              strokeColor={data.color}
              lineDashPattern={[1, 10]}
            />
          ) : (
            <Polyline
              coordinates={data.coordinates}
              strokeWidth={5}
              strokeColor={data.color}
            />
          )
        )
      ) : (
        <></>
      )}
      {suggestedRoute &&
        suggestedRoute
          .filter((item) => item.transport === 'bus')
          .map((route, index) =>
            route.listPoint.map((point) =>
              index === 0 ? (
                <Marker coordinate={point.location}>
                  <Image
                    source={require(orangeBusStationIcon)}
                    style={styles.markerImage}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </Marker>
              ) : (
                <Marker coordinate={point.location}>
                  <Image
                    source={require(blueBusStationIcon)}
                    style={styles.markerImage}
                    resizeMode="center"
                    resizeMethod="resize"
                  />
                </Marker>
              )
            )
          )}
      {children}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerImage: {
    width: 28,
    height: 28,
  },
  activeMarkerImage: {
    width: 36,
    height: 36,
  },
})

const mapStyle = [
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
]
