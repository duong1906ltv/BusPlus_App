import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Map from '../components/map/Map'
import { Divider } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { selectFoundRoute } from "../reducers/route";
import { getAllRoutes, setProgress } from "../actions/route";
import { DESTINATION, ORIGINAL } from '../share/constants/direction';
import { getFullDetailDirection } from '../utils/mapUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';
function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const foundRoute = useSelector(selectFoundRoute)
  const [inputOriginal, setInputOriginal] = useState("");
  const [inputDestination, setInputDestination] = useState("");
  const [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    dispatch(getAllRoutes())
  }, [dispatch])

  useEffect(() => {
    if (foundRoute.original) {
      setInputOriginal(foundRoute.original.name)
    } else{
      setCoordinates(null)
      setInputOriginal('')
    }
    if (foundRoute.destination) {
      setInputDestination(foundRoute.destination.name)
    } else{
      setCoordinates(null)
      setInputDestination('')
    }
    if (foundRoute.original && foundRoute.destination) {
      getDirection()
    }
  }, [foundRoute])
  const getDirection = async () => {
    const results = await getFullDetailDirection([foundRoute.original.location, foundRoute.destination.location])
    setCoordinates(results)
  }

  const inputOriginalRef = useRef(null)
  const inputDestinationRef = useRef(null)
  const openSearchScreen = (searchFor) => {
    if (inputOriginalRef.current) {
      inputOriginalRef.current.blur();
    }
    if (inputDestinationRef.current) {
      inputDestinationRef.current.blur();
    }
    navigation.navigate('SearchScreen', { searchFor: searchFor });
  };
  const openSuggestedRouteScreen = () => {
    navigation.navigate('SuggestedRouteScreen');
    dispatch(setProgress(true))

  }
  return (
    <View style={styles.container}>
      <Map coordinates={coordinates} />
      <View style={styles.content}>
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
        {
          foundRoute.original && foundRoute.destination && 
          <View style={styles.buttonContainer}
            animationIn="slideInUp"
            animationOut="slideOutDown">
              <TouchableOpacity style={styles.button} onPress={openSuggestedRouteScreen}>
              <Text style={{ color: 'white' }}>Gợi ý tuyến xe</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {

    width: '100%',
    height: '100%',
    position: 'relative'
  },
  content: {
    width: '100%',
    height: '20%',
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
    width: "94%",
    height: 80,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    width: '95%',
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
  buttonContainer: {
    top: '460%',
    width: '94%',
    position: 'absolute',

  },
  button: {
    backgroundColor: '#ffab15',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10, 
    borderRadius: 10,
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
  }
})

export default HomeScreen
