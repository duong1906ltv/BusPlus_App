import BusLocation from '../bus/BusLocation'
import CheckinLocation from '../checkin/CheckinLocation'
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
        <CheckinLocation />
      </Map>
    </>
  )
}

export default RouteDirection
