import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-native-modal';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed';
import { selectFoundRoute, selectMaximumNumOfRoute, selectProgress, selectRoutes, selectSuggestedRouteList } from "../reducers/route";
import { getAllRoutes, setMaximumNumOfRoute, setProgress, setSuggestedRoute, setSuggestedRouteList } from "../actions/route";
import { DESTINATION, ORIGINAL } from '../share/constants/direction';
import { Divider } from '@rneui/base';
import SuggestedRoute from '../components/SuggestedRoute';
import {  spaceBetween, textBold } from '../constants/styles';
import { getDistance } from 'geolib';
import { Colors } from '../constants/colors';
import Spinner from 'react-native-loading-spinner-overlay';


const ORANGE = "#ffab15"


function SuggestedRouteScreen({ navigation }) {
  const searchFor = ORIGINAL
  const dispatch = useDispatch();
  const allRoutes = useSelector(selectRoutes)
  const foundRoute = useSelector(selectFoundRoute)
  const inProgress = useSelector(selectProgress)

  const [inputOriginal, setInputOriginal] = useState("");
  const [inputDestination, setInputDestination] = useState("");

  // const [pointsOfForwardNearOriginal, setPointsOfForwardNearOriginal] = useState([])
  const [pointsOfBackwardNearOriginal, setPointsOfBackwardNearOriginal] = useState([])

  const [pointsOfForwardNearDestination, setPointsOfForwardNearDestination] = useState([])
  const [pointsOfBackwardNearDestination, setPointsOfBackwardNearDestination] = useState([])

  const [listOriginalOfForward, setListOriginalOfForward] = useState([])
  const [listOriginalOfBackward, setListOriginalOfBackward] = useState([])
  const [listDestinationOfForward, setListDestinationOfForward] = useState([])
  const [listDestinationOfBackward, setListDestinationOfBackward] = useState([])

  const suggestedRouteList = useSelector(selectSuggestedRouteList)
  const maximumNumOfRoute = useSelector(selectMaximumNumOfRoute)

  const inputOriginalRef = useRef(null)
  const inputDestinationRef = useRef(null)

  const backToHomeScreen = () => {
    navigation.goBack()
  }
  useEffect(() => {
    dispatch(getAllRoutes())
  }, [dispatch])
  useEffect(() => {
    if (foundRoute.original) {
      setInputOriginal(foundRoute.original.name)
    } else {
      setInputOriginal('')
    }
    if (foundRoute.destination) {
      setInputDestination(foundRoute.destination.name)
    } else {
      setInputDestination('')
    }
  }, [foundRoute])



  const getNearerPoint = (data) => {
    if (data.length <= 0) return []
    const result = data.reduce((acc, cur) => {
      const existing = acc[cur.routeNumber];
      if (!existing || existing.distance > cur.distance) {
        acc[cur.routeNumber] = cur;
      }
      return acc;
    }, {});
    return Object.values(result)
  }

  useEffect(() => {
    if (foundRoute.original && foundRoute.destination && allRoutes.length) {
      const pointsOfForwardNearOriginal = []
      const pointsOfForwardNearDestination = []
      const pointsOfBackwardNearOriginal = []
      const pointsOfBackwardNearDestination = []
      allRoutes.forEach((route, i) => {
        route.forwardRoute.forEach((station, index) => {
          try {
            const distance = getDistance(station.location, foundRoute.original.location)
            if (distance <= 1000) {
              const newPoint = {
                distance: distance,
                routeNumber: route.routeNumber,
                name: station.name,
                numberBusStop: station.numberBusStop,
                location: station.location,
                cost: route.cost,
              }
              // console.log("newPoint1, ",newPoint);
              // setPointsOfForwardNearOriginal(pre => [...pre, newPoint])
              pointsOfForwardNearOriginal.push(newPoint)
            }
          } catch (error) {
            console.log("error", error);
          }
        });
        route.forwardRoute.forEach(station => {
          const distance = getDistance(station.location, foundRoute.destination.location)
          if (distance <= 1000) {
            const newPoint = {
              distance: distance,
              routeNumber: route.routeNumber,
              name: station.name,
              numberBusStop: station.numberBusStop,
              location: station.location,
              cost: route.cost,
            }
            pointsOfForwardNearDestination.push(newPoint)
          }
        });

        route.backwardRoute.forEach(station => {
          const distance = getDistance(station.location, foundRoute.original.location)
          if (distance <= 1000) {
            const newPoint = {
              distance: distance,
              routeNumber: route.routeNumber,
              name: station.name,
              numberBusStop: station.numberBusStop,
              location: station.location,
              cost: route.cost,
            }
            pointsOfBackwardNearOriginal.push(newPoint)
          }
        });

        route.backwardRoute.forEach(station => {
          const distance = getDistance(station.location, foundRoute.destination.location)
          if (distance <= 1000) {
            const newPoint = {
              distance: distance,
              routeNumber: route.routeNumber,
              name: station.name,
              numberBusStop: station.numberBusStop,
              location: station.location,
              cost: route.cost,
            }

            pointsOfBackwardNearDestination.push(newPoint)
          }
        });
      })
      setListOriginalOfForward(getNearerPoint(pointsOfForwardNearOriginal))
      setListDestinationOfForward(getNearerPoint(pointsOfForwardNearDestination))
      setListOriginalOfBackward(getNearerPoint(pointsOfBackwardNearOriginal))
      setListDestinationOfBackward(getNearerPoint(pointsOfBackwardNearDestination))

    } else {
      setListOriginalOfForward([])
      setListOriginalOfBackward([])
      setListDestinationOfForward([])
      setListDestinationOfBackward([])
      setSuggestedRoute(null)
      dispatch(setSuggestedRouteList([]))
      dispatch(setMaximumNumOfRoute(1))
    }
  }, [foundRoute, allRoutes])


  useEffect(() => {
    if (!foundRoute.original || !foundRoute.destination || allRoutes.length <= 0) return
    // console.log("listOriginalOfForward =", listOriginalOfForward);
    // console.log("listDestinationOfForward =", listDestinationOfForward);
    // console.log("listOriginalOfBackward =", listOriginalOfBackward);
    // console.log("listDestinationOfBackward =", listDestinationOfBackward);
    const suggestedList = []
    dispatch(setSuggestedRouteList([]))

    if (listOriginalOfForward.length > 0 && listDestinationOfForward.length > 0) {
      listOriginalOfForward.forEach(original => {
        const list = []
        // maximumNumOfRoute === 1
        const destination = listDestinationOfForward.find(item => item.routeNumber === original.routeNumber)
        if (destination) {
          if (original.numberBusStop < destination.numberBusStop) {

            const suggestedRoute = [
              {
                transport: "bus",
                cost: destination.cost,
                routeNumber: destination.routeNumber,
                listPoint: allRoutes.find(item => item.routeNumber === destination.routeNumber).forwardRoute.slice(original.numberBusStop, destination.numberBusStop + 1),
                color: "#FFA836",
                // icon: orangeBusStationIcon,
              }
            ]

            const walkingDistance_Original = getDistance(original.location, foundRoute.original.location)

            const walkingDistance_Destination = getDistance(destination.location, foundRoute.destination.location)

            if (walkingDistance_Original > 0) {
              const walkingRoute_Original = {
                transport: "walking",
                routeNumber: null,
                listPoint: [foundRoute.original, original],
                totalDistance: parseInt(walkingDistance_Original),
                color: "gray"
              }
              suggestedRoute.unshift(walkingRoute_Original)
            }
            if (walkingDistance_Destination > 0) {
              const walkingRoute_Destination = {
                transport: "walking",
                routeNumber: null,
                listPoint: [destination, foundRoute.destination],
                totalDistance: parseInt(walkingDistance_Destination),
                color: "gray"
              }
              suggestedRoute.push(walkingRoute_Destination)
            }
            suggestedList.push(suggestedRoute)
          }
        }
        // maximumNumOfRoute === 2
        listDestinationOfForward.forEach(destination => {
          const busStation_Original = allRoutes.find(route => route.routeNumber === original.routeNumber).forwardRoute
          const busStation_Destination = allRoutes.find(route => route.routeNumber === destination.routeNumber).forwardRoute
          var posBusStation_Original = null
          var posBusStation_Destination = null
          var distance = 500
          for (const _original of busStation_Original) {
            for (const _destination of busStation_Destination) {
              const distanceResult = getDistance(_original.location, _destination.location)
              if (distanceResult < distance) {
                posBusStation_Original = _original.numberBusStop
                posBusStation_Destination = _destination.numberBusStop
                distance = distanceResult
              }
            }
          }
          if (original.numberBusStop < posBusStation_Original && destination.numberBusStop > posBusStation_Destination) {
            const suggestedRoute = [
              {
                transport: "bus",
                cost: original.cost,
                routeNumber: original.routeNumber,
                listPoint: busStation_Original.slice(original.numberBusStop, posBusStation_Original + 1),
                color: "#FFA836",
                // icon: orangeBusStationIcon,
              },
              {
                transport: "bus",
                cost: destination.cost,
                routeNumber: destination.routeNumber,
                listPoint: busStation_Destination.slice(posBusStation_Destination, destination.numberBusStop + 1),
                color: "#2983c7",
                // icon: blueBusStationIcon,
              },
            ]

            const walkingDistance_Original = getDistance(original.location, foundRoute.original.location)

            const walkingDistance_Destination = getDistance(destination.location, foundRoute.destination.location)

            const stationSwitchingDistance = getDistance(busStation_Original[posBusStation_Original].location, busStation_Destination[posBusStation_Destination].location)
            if (stationSwitchingDistance > 0) {
              const route = {
                transport: "walking",
                routeNumber: null,
                listPoint: [busStation_Original[posBusStation_Original], busStation_Destination[posBusStation_Destination]],
                totalDistance: parseInt(stationSwitchingDistance),
                color: "gray"
              }
              suggestedRoute.insert(1, route)
            }
            if (walkingDistance_Original > 0) {
              const walkingRoute_Original = {
                transport: "walking",
                routeNumber: null,
                listPoint: [foundRoute.original, original],
                totalDistance: parseInt(walkingDistance_Original),
                color: "gray"
              }
              suggestedRoute.unshift(walkingRoute_Original)
            }
            if (walkingDistance_Destination > 0) {
              const walkingRoute_Destination = {
                transport: "walking",
                routeNumber: null,
                listPoint: [destination, foundRoute.destination],
                totalDistance: parseInt(walkingDistance_Destination),
                color: "gray"
              }
              suggestedRoute.push(walkingRoute_Destination)
            }
            suggestedList.push(suggestedRoute)

          }
        });
      });
    }
    if (listOriginalOfBackward.length > 0 && listDestinationOfBackward.length > 0) {
      listOriginalOfBackward.forEach(original => {
        // maximumNumOfRoute === 1
        const destination = listDestinationOfBackward.find(item => item.routeNumber === original.routeNumber)
        if (destination) {
          if (original.numberBusStop < destination.numberBusStop) {
            const suggestedRoute = [
              {
                transport: "bus",
                cost: destination.cost,
                routeNumber: destination.routeNumber,
                listPoint: allRoutes.find(item => item.routeNumber === destination.routeNumber).backwardRoute.slice(original.numberBusStop, destination.numberBusStop + 1),
                color: "#FFA836",
                // icon: orangeBusStationIcon,
              }
            ]
            const walkingDistance_Original = getDistance(original.location, foundRoute.original.location)

            const walkingDistance_Destination = getDistance(destination.location, foundRoute.destination.location)
            if (walkingDistance_Original > 0) {
              const walkingRoute_Original = {
                transport: "walking",
                routeNumber: null,
                listPoint: [foundRoute.original, original],
                totalDistance: parseInt(walkingDistance_Original),
                color: "gray"
              }
              suggestedRoute.unshift(walkingRoute_Original)
            }
            if (walkingDistance_Destination > 0) {
              const walkingRoute_Destination = {
                transport: "walking",
                routeNumber: null,
                listPoint: [destination, foundRoute.destination],
                totalDistance: parseInt(walkingDistance_Destination),
                color: "gray"
              }
              suggestedRoute.push(walkingRoute_Destination)
            }
            suggestedList.push(suggestedRoute)

          }
        }
        // maximumNumOfRoute === 2
        listDestinationOfBackward.forEach(destination => {
          const busStation_Original = allRoutes.find(route => route.routeNumber === original.routeNumber).backwardRoute
          const busStation_Destination = allRoutes.find(route => route.routeNumber === destination.routeNumber).backwardRoute
          var posBusStation_Original = null
          var posBusStation_Destination = null
          var distance = 500
          for (const _original of busStation_Original) {
            for (const _destination of busStation_Destination) {
              const distanceResult = getDistance(_original.location, _destination.location)
              if (distanceResult < distance) {
                posBusStation_Original = _original.numberBusStop
                posBusStation_Destination = _destination.numberBusStop
                distance = distanceResult
              }
            }
          }
          if (original.numberBusStop < posBusStation_Original && destination.numberBusStop > posBusStation_Destination) {
            const suggestedRoute = [
              {
                transport: "bus",
                cost: original.cost,
                routeNumber: original.routeNumber,
                listPoint: busStation_Original.slice(original.numberBusStop, posBusStation_Original + 1),
                color: "#FFA836",
                // icon: orangeBusStationIcon,
              },
              {
                transport: "bus",
                cost: destination.cost,
                routeNumber: destination.routeNumber,
                listPoint: busStation_Destination.slice(posBusStation_Destination, destination.numberBusStop + 1),
                color: "#2983c7",
                // icon: blueBusStationIcon,
              },
            ]
            const walkingDistance_Original = getDistance(original.location, foundRoute.original.location)

            const walkingDistance_Destination = getDistance(destination.location, foundRoute.destination.location)

            const stationSwitchingDistance = getDistance(busStation_Original[posBusStation_Original].location, busStation_Destination[posBusStation_Destination].location)

            if (stationSwitchingDistance > 0) {
              const route = {
                transport: "walking",
                routeNumber: null,
                listPoint: [busStation_Original[posBusStation_Original], busStation_Destination[posBusStation_Destination]],
                totalDistance: parseInt(stationSwitchingDistance),
                color: "gray"
              }
              suggestedRoute.insert(1, route)
            }
            if (walkingDistance_Original > 0) {
              const walkingRoute_Original = {
                transport: "walking",
                routeNumber: null,
                listPoint: [foundRoute.original, original],
                totalDistance: parseInt(walkingDistance_Original),
                color: "gray"
              }
              suggestedRoute.unshift(walkingRoute_Original)
            }
            if (walkingDistance_Destination > 0) {
              const walkingRoute_Destination = {
                transport: "walking",
                routeNumber: null,
                listPoint: [destination, foundRoute.destination],
                totalDistance: parseInt(walkingDistance_Destination),
                color: "gray"
              }
              suggestedRoute.push(walkingRoute_Destination)
            }
            suggestedList.push(suggestedRoute)

          }
        });
        // }
      });
    }
    // maximumNumOfRoute === 2
    var flag = false
    if (listOriginalOfForward.length > 0 && listDestinationOfBackward.length > 0) {
      listOriginalOfForward.forEach(original => {
        if (flag) return
        listDestinationOfBackward.forEach(destination => {
          if (original.routeNumber === destination.routeNumber) return
          const busStation_Original = allRoutes.find(route => route.routeNumber === original.routeNumber).forwardRoute
          const busStation_Destination = allRoutes.find(route => route.routeNumber === destination.routeNumber).backwardRoute

          const distance1 = getDistance(busStation_Original[0].location, destination.location)

          const distance2 = getDistance(busStation_Original[1].location, destination.location)
          if (distance1 < distance2) {
            flag = true
            return
          }
          var posBusStation_Original = null
          var posBusStation_Destination = null
          var distance = 500
          for (const _original of busStation_Original) {
            for (const _destination of busStation_Destination) {
              const distanceResult = getDistance(_original.location, _destination.location)
              if (distanceResult < distance) {
                posBusStation_Original = _original.numberBusStop
                posBusStation_Destination = _destination.numberBusStop
                distance = distanceResult
              }
            }
          }
          if (original.numberBusStop < posBusStation_Original && destination.numberBusStop > posBusStation_Destination) {
            const suggestedRoute = [
              {
                transport: "bus",
                cost: original.cost,
                routeNumber: original.routeNumber,
                listPoint: busStation_Original.slice(original.numberBusStop, posBusStation_Original + 1),
                color: "#FFA836",
                // icon: orangeBusStationIcon,
              },
              {
                transport: "bus",
                cost: destination.cost,
                routeNumber: destination.routeNumber,
                listPoint: busStation_Destination.slice(posBusStation_Destination, destination.numberBusStop + 1),
                color: "#2983c7",
                // icon: blueBusStationIcon,
              },
            ]
            suggestedList.push(suggestedRoute)

          }
        });

      });
    }
    flag = false
    if (listOriginalOfBackward.length > 0 && listDestinationOfForward.length > 0) {
      listOriginalOfBackward.forEach(original => {
        if (flag) return
        listDestinationOfForward.forEach(destination => {
          if (original.routeNumber === destination.routeNumber) return
          const busStation_Original = allRoutes.find(route => route.routeNumber === original.routeNumber).backwardRoute
          const busStation_Destination = allRoutes.find(route => route.routeNumber === destination.routeNumber).forwardRoute
          // if (getLatLng(busStation_Original[0]).distanceTo(getLatLng(destination)) < getLatLng(busStation_Original[1]).distanceTo(getLatLng(destination))) {

          const distance1 = getDistance(busStation_Original[0].location, destination.location)

          const distance2 = getDistance(busStation_Original[1].location, destination.location)
          if (distance1 < distance2) {
            flag = true
            return
          }
          var posBusStation_Original = null
          var posBusStation_Destination = null
          var distance = 500
          for (const _original of busStation_Original) {
            for (const _destination of busStation_Destination) {
              const distanceResult = getDistance(_original.location, _destination.location)
              if (distanceResult < distance) {
                posBusStation_Original = _original.numberBusStop
                posBusStation_Destination = _destination.numberBusStop
                distance = distanceResult
              }
            }
          }
          if (original.numberBusStop < posBusStation_Original && destination.numberBusStop > posBusStation_Destination) {
            const suggestedRoute = [
              {
                transport: "bus",
                cost: original.cost,
                routeNumber: original.routeNumber,
                listPoint: busStation_Original.slice(original.numberBusStop, posBusStation_Original + 1),
                color: "#FFA836",
                // icon: orangeBusStationIcon,
              },
              {
                transport: "bus",
                cost: destination.cost,
                routeNumber: destination.routeNumber,
                listPoint: busStation_Destination.slice(posBusStation_Destination, destination.numberBusStop + 1),
                color: "#2983c7",
                // icon: blueBusStationIcon,
              },
            ]
            suggestedList.push(suggestedRoute)
          }
        });
      });
    }
    dispatch(setSuggestedRouteList(suggestedList))
    if ((listOriginalOfForward.length || listDestinationOfForward.length || listOriginalOfBackward.length || listDestinationOfBackward.length)) {
      dispatch(setProgress(false))
    }

  }, [listOriginalOfForward, listDestinationOfForward, listOriginalOfBackward, listDestinationOfBackward, maximumNumOfRoute])
  const [currentSuggestedRouteList, setCurrentSuggestedRouteList] = useState(false)
  useEffect(() => {
    console.log("suggestedRouteList", suggestedRouteList.length);
    const _currentSuggestedRouteList = []
    suggestedRouteList.map(route => {
      if (route.filter(item => item.transport === "bus").length === maximumNumOfRoute) {
        _currentSuggestedRouteList.push(route)
      }
    })

    if (_currentSuggestedRouteList) setCurrentSuggestedRouteList(_currentSuggestedRouteList)
  }, [maximumNumOfRoute, suggestedRouteList])

  const openSearchScreen = (searchFor) => {
    if (inputOriginalRef.current) {
      inputOriginalRef.current.blur();
    }
    if (inputDestinationRef.current) {
      inputDestinationRef.current.blur();
    }
    navigation.navigate('SearchScreen', { searchFor: searchFor, inProgress: true });
  };


  const [modalVisible, setModalVisible] = useState(false);

  const showSelectBoxModal = () => {
    setModalVisible(true);
  }

  const closeSelectBoxModal = () => {
    setModalVisible(false);
  };
  const handleOptionSelect = (option) => {
    dispatch(setMaximumNumOfRoute(option))
    closeSelectBoxModal()

  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <View style={spaceBetween}>
          <View style={styles.btnBack}>
            <TouchableOpacity onPress={backToHomeScreen}>
              <Icon size={25} color="#fff" name="ios-chevron-back-outline" type="ionicon" />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: "#fff" }}>Gợi ý tuyến xe</Text>
          </View>

          <View style={styles.selectBoxContainer}>
            <TouchableOpacity style={styles.selectBox} onPress={showSelectBoxModal}>
              <Text style={{ color: '#fff' }}>{maximumNumOfRoute} tuyến</Text>
              <Icon size={15} color={"#fff"} name="caret-down-sharp" type="ionicon" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <View style={styles.inputContainer}>
            <Icon style={styles.icon} size={20} name="md-locate" color="#ffab15" type="ionicon" />
            <TextInput style={styles.input}
              ref={inputOriginalRef}
              onChangeText={setInputOriginal}
              value={inputOriginal}
              placeholder="Chọn điểm xuất phát"
              onFocus={() => openSearchScreen(ORIGINAL)}
            />
          </View>
          <Divider />
          <View style={styles.inputContainer}>
            <Icon style={styles.icon} name="md-location-sharp" size={18} color="#ffab15" type="ionicon" />
            <TextInput
              style={styles.input}
              ref={inputDestinationRef}
              onChangeText={setInputDestination}
              value={inputDestination}
              placeholder="Chọn điểm kết thúc"
              onFocus={() => openSearchScreen(DESTINATION)}
            />
          </View>
        </View>
      </View>
      <ScrollView style={{ width: '100%', paddingHorizontal: 10 }}>
        {
          currentSuggestedRouteList.length > 0
            ? (
              <View style={{ marginVertical: 10 }}>
                <Text style={textBold(14)}>Các cách di chuyển phù hợp</Text>
                <View style={styles.card}>
                  {
                    Array.from(new Set(currentSuggestedRouteList.map(JSON.stringify)), JSON.parse).map(route => (
                      <>

                        <TouchableOpacity onPress={() => {
                          dispatch(setSuggestedRoute(route))
                          navigation.navigate('GuideRouteScreen')
                        }}>
                          <SuggestedRoute suggestedRoute={route} />
                        </TouchableOpacity>
                        <Divider />
                      </>
                    ))
                  }
                </View>
              </View>
            )
            : <></>
        }
        {
          suggestedRouteList.length > 0
            ? (
              <View style={{ marginVertical: 10 }}>
                <Text style={textBold(14)}>Các cách di chuyển gợp ý</Text>
                <View style={styles.card}>
                  {
                    suggestedRouteList.map(route => (
                      <>
                        <TouchableOpacity onPress={() => {
                          dispatch(setSuggestedRoute(route))
                          navigation.navigate('GuideRouteScreen')
                        }}>
                          <SuggestedRoute suggestedRoute={route} />
                        </TouchableOpacity>
                        <Divider />
                      </>
                    ))
                  }
                </View>
              </View>
            )
            : <></>
        }
        {
          suggestedRouteList.length <= 0 && !inProgress
            ? (
              <Text style={textBold(14)}>Không có tuyến đi phù hợp</Text>
            )
            : <></>
        }
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        style={styles.modal}
        onBackdropPress={closeSelectBoxModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        backdropTransitionOutTiming={0}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTextHeader}>Chọn số tuyến tối đa</Text>
          <TouchableOpacity onPress={() => handleOptionSelect(1)}>
            <Text style={styles.modalText}>1 tuyến</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelect(2)}>
            <Text style={styles.modalText}>2 tuyến</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Spinner visible={inProgress} />

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    position: 'absolute',
    marginTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  searchBar: {
    backgroundColor: '#fff',
    width: "100%",
    height: 80,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: 'gray',
  },
  icon: {
    width: 20,
  },
  resultsContainer: {
    width: '90%',
    height: 200,
    top: 40,
    left: 30,
    position: 'absolute',
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  resultsText: {
    flexWrap: 'nowrap',
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#fff'
  },
  header: {
    width: '100%',
    backgroundColor: ORANGE,
    paddingHorizontal: 10,
    paddingTop: 25,
    paddingBottom: 10,
    gap: 10,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 'auto'
  },
  tabBar: {
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 10,
  },
  selectBoxContainer: {
    borderRadius: 5,
    width: "25%",
    // paddingVertical: 10,
    backgroundColor: ORANGE,
    borderWidth: 1,
    borderColor: '#fff',
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 7,

  },
  card: {
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 5,
    // padding: 10,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    height: 150,
    padding: 16,
  },
  modalTextHeader: {
    fontSize: 16,
    color: Colors.gray700,
    padding: 10,
  },
  modalText: {
    fontSize: 16,
    padding: 10,
  }
})

export default SuggestedRouteScreen
