import { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useSelector } from 'react-redux'
import * as Location from 'expo-location'
import * as TaskManager from 'expo-task-manager'
import { useEffect } from 'react'
import { Linking } from 'react-native'
import { Alert } from 'react-native'
import geolib from 'geolib';
const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION'
import { selectFoundRoute, selectSuggestedRoute } from '../../reducers/route'
import { getFullDetailDirection } from '../../utils/mapUtils'

export const busStationIcon = "../../assets/images/orange_icon_bus_station.png"

export const orangeBusStationIcon = "../../assets/images/orange_icon_bus_station.png"

export const blueBusStationIcon = "../../assets/images/blue_icon_bus_station.png"

export const locationIcon = "../../assets/images/icon_location.png"

export const pointIcon = "../../assets/images/icon_points.png"

export const busIcon = "../../assets/images/bus_orange.png"

function Map({ coordinates, stations, origin, children }) {
  const [zoomLevel, setZoomLevel] = useState(null)
  const foundRoute = useSelector(selectFoundRoute)
  const suggestedRoute = useSelector(selectSuggestedRoute)


  const region = {
    latitude: 16.0738355,
    longitude: 108.145475,
    latitudeDelta: 0.04,
    longitudeDelta: 0.02,
  }

  const uri = '../../assets/images/icon_bus_station.png'

  const handleRegionChangeComplete = (region) => {
    setZoomLevel(region.latitudeDelta)
  }

  const [walkingCoordinates, setWalkingCoordinates] = useState([])
  const getWalkingDirection = async (data, color) => {
    const results = await getFullDetailDirection(data)
    const direction = {
      coordinates: results,
      color: color
    }
    setWalkingCoordinates(walkingCoordinates => [...walkingCoordinates, direction])
  }
  useEffect(() => {
    if (suggestedRoute) {
      suggestedRoute.map(route => {
        const listCoordinates = route.listPoint.map(item => {
          return item.location
        })
        getWalkingDirection(listCoordinates, route.color)
      })
    }
  }, [suggestedRoute])

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      initialRegion={region}
      // region={{ ...origin, latitudeDelta: 0.04, longitudeDelta: 0.02 }}
      onRegionChangeComplete={handleRegionChangeComplete}
    >
      {zoomLevel <= 0.05 &&
        stations &&
        stations.map((station, index) => (
          <Marker coordinate={station} key={index}>
            <Image
              source={require(uri)}
              style={styles.markerImage}
              resizeMode="center"
              resizeMethod="resize"
            />
          </Marker>
        ))}
      {
        foundRoute.original &&
        <Marker coordinate={foundRoute.original.location}>
          <Image
            source={require(pointIcon)}
            style={styles.markerImage}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Marker>
      }
      {
        foundRoute.destination &&
        <Marker coordinate={foundRoute.destination.location}>
          <Image
            source={require(locationIcon)}
            style={styles.markerImage}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Marker>
      }
      {coordinates && (
        <Polyline
          coordinates={coordinates}
          strokeWidth={5}
          strokeColor="orange"
        />
      )}
      {
        walkingCoordinates.length
          ? (
            walkingCoordinates.map(data => (
              data.color === "gray"
                ? (
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

            ))
          )
          : <></>

      }
      {
        suggestedRoute && (
          suggestedRoute.filter(item => item.transport === "bus").map((route, index) => (
            route.listPoint.map(point => (
              index === 0
                ? (
                  <Marker coordinate={point.location}>
                    <Image
                      source={require(orangeBusStationIcon)}
                      style={styles.markerImage}
                      resizeMode="center"
                      resizeMethod="resize"
                    />
                  </Marker>
                )
                : (
                  <Marker coordinate={point.location}>
                    <Image
                      source={require(blueBusStationIcon)}
                      style={styles.markerImage}
                      resizeMode="center"
                      resizeMethod="resize"
                    />
                  </Marker>
                )
            ))
          ))
        )
      }
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
    width: 24,
    height: 24,
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
