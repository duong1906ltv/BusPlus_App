import BusLocation from '../bus/BusLocation'
import Map from '../map/Map'

function RouteDirection({
  routeDirection,
  routeStations,
  origin,
  routeNumber,
  checkinLocation,
}) {
  return (
    <>
      <Map
        coordinates={routeDirection}
        stations={routeStations}
        origin={origin}
        checkinLocation={checkinLocation}
      >
        <BusLocation routeNumber={routeNumber} />
      </Map>
    </>
  )
}

export default RouteDirection
