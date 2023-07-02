import BusLocation from '../bus/BusLocation'
import CheckinLocation from '../checkin/CheckinLocation'
import FriendLocation from '../checkin/friendLocation'
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
        <FriendLocation />
      </Map>
    </>
  )
}

export default RouteDirection
