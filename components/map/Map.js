import { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

function Map({ coordinates, stations, origin, children }) {
  const [zoomLevel, setZoomLevel] = useState(null)
  console.log('origin', origin)

  const region = {
    latitude: 16.07215,
    longitude: 108.22679,
    latitudeDelta: 0.04,
    longitudeDelta: 0.02,
  }

  const uri = '../../assets/images/icon_bus_station.png'

  const handleRegionChangeComplete = (region) => {
    setZoomLevel(region.latitudeDelta)
  }

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      initialRegion={region}
      region={{ ...origin, latitudeDelta: 0.04, longitudeDelta: 0.02 }}
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
      {coordinates && (
        <Polyline
          coordinates={coordinates}
          strokeWidth={5}
          strokeColor="orange"
        />
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
