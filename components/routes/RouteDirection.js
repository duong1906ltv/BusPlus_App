import BusLocation from '../bus/BusLocation'
import Map from '../map/Map'

function RouteDirection({ routeDirection, routeStations, origin }) {
  return (
    <>
      <Map
        coordinates={routeDirection}
        stations={routeStations}
        origin={origin}
      >
        <BusLocation />
      </Map>
    </>
  )
}

export default RouteDirection
