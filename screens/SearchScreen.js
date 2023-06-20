import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed';
import { selectFoundRoute} from "../reducers/route";
import { setFoundRoute, setProgress } from "../actions/route";
import { getLocation } from '../services/api'
import { DESTINATION, ORIGINAL } from '../share/constants/direction';
function SearchScreen({ route, navigation }) {
  const { searchFor, inProgess } = route.params;
  const dispatch = useDispatch();
  const foundRoute = useSelector(selectFoundRoute)
  const [searchResults, setSearchResults] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    var _foundRoute
    if (searchFor === ORIGINAL){
      _foundRoute = {
        ...foundRoute,
        original: null
      }
    } else if( searchFor === DESTINATION){
      _foundRoute = {
        ...foundRoute,
        destination: null
      }
    }
    dispatch(setFoundRoute(_foundRoute));
    handleSearch(inputText);
  }, [inputText])

  const handleSearch = async (searchText) => {
    const query = searchText
    if (!query) return;
    try {
      const result = await getLocation(query);
      setSearchResults(result.data.results)
    } catch (error) {
      console.log(error);
    }
  };
  const onResultsSearchItemClick = (data) => {
    var _foundRoute ={
      destination: null,
      original: null,
    }
    if (data && data.geometry && data.geometry.location) {
      if (searchFor === ORIGINAL) {
        _foundRoute = {
          ...foundRoute,
          original: {
            location: {
              latitude: data.geometry.location.lat,
              longitude: data.geometry.location.lng,
            },
            name: data.formatted_address,
            zoom: 17
          }
        }
      } else if (searchFor === DESTINATION) {
        _foundRoute = {
          ...foundRoute,
          destination: {
            location: {
              latitude: data.geometry.location.lat,
              longitude: data.geometry.location.lng,
            },
            name: data.formatted_address,
            zoom: 17
          }
        }
      }
    }
    setSearchResults([])
    dispatch(setFoundRoute(_foundRoute));
    navigation.goBack()
  }
  useEffect(()=>{
    if (foundRoute.original && foundRoute.destination && inProgess === true) {
      dispatch(setProgress(true))
      navigation.goBack()
    }
  }, [foundRoute])

  const backToHomeScreen = () => {
    onResultsSearchItemClick()
  }
  function containsAlphabet(str) {
    const regex = /[a-zA-ZÀ-ỹ]/; // Biểu thức chính quy kiểm tra chữ cái (bao gồm cả tiếng Việt)
    return regex.test(str);
  }
  const getStreet = (address) => {
    if (!containsAlphabet(address[0].long_name)){
      return {
        street: `${address[0].long_name} ${address[1].long_name}`,
        address: address.slice(2).map((item)=> item.long_name).join(", ")
      }
    } else {
      return {
        street: `${address[0].long_name}`,
        address: address.slice(1).map((item) => item.long_name).join(", ")
      }
    }
  } 
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={backToHomeScreen}>
          <Icon style={styles.inputIcon} size={25} color="#0d0d0d" name="ios-chevron-back-outline" type="ionicon" />
        </TouchableOpacity>
        <TextInput style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="TIm kiếm địa điểm"
        />
      </View>
      <View style={styles.resultsContainer}>
        {
          searchResults && searchResults.length > 0 &&
          searchResults.map(data => (
            <TouchableOpacity onPress={() => onResultsSearchItemClick(data)}>
              <View style={styles.resultsContent}>
                <Icon style={styles.resultsIcon} name="location-outline" size={18} type="ionicon" />
                <View style={styles.resultsText}>
                  <Text style={{ fontSize: 16 }}>{getStreet(data.address_components).street}</Text>
                  <Text style={{ fontSize: 14, color: 'gray' }}>{getStreet(data.address_components).address}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingVertical: 50,
    backgroundColor: 'white'
  },
  inputContainer: {
    paddingHorizontal: 10,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#0d0d0d'
  },
  resultsContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  resultsContent: {
    width: '82%',
    marginHorizontal: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 10,
  },
  resultsIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#d9d9d9',
    borderRadius: '50%',
    justifyContent: 'center',
    marginTop: 10,
  },
  resultsText: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    marginTop: 10,
    paddingBottom: 10,
  }

})

export default SearchScreen
