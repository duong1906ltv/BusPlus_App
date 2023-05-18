import { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'

function Map({ coordinates, stations }) {
  const [zoomLevel, setZoomLevel] = useState(0)

  const region = {
    latitude: 16.07215,
    longitude: 108.22679,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
