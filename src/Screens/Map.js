import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { Linking } from 'react-native';
import Coupens from "./Coupens";
import Wallet from "./Wallet";
import {
  StyleSheet,
  Pressable,
  View,
  Button,
  TextInput,
  Text,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { AppContext } from "../../Context";
import { useNavigation } from "@react-navigation/native";

function Map() {
  const drawer = useRef(null);
  const navigation = useNavigation();
  const con = AppContext()

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [message, setMessage] = useState('Start');


  const Stack = createStackNavigator();

  const [isMarker,setIsMarker]=useState(false)
  const nearbyStations = [
    { name: 'AICTE Idea Lab', latitude: 23.251535, longitude: 77.523530 },
    { name: 'LNCT Main canteen', latitude: 23.250294, longitude: 77.526620 },
    { name: 'LNCT S', latitude: 23.250240, longitude: 77.527878},
    { name: 'LNCT New Boys Hostel', latitude: 23.249259, longitude: 77.523768 },
    
  ];

  const [mapRegion, setMapRegion] = useState({
    latitude: 20.5937,
    longitude: 78.9629,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });
  const userLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setIsMarker(true);
    console.log(location);
  };
  const executeUserLocation = () => {
    userLocation();
  };
  useEffect(()=>{
    userLocation();
  },[])
  const handleStationClick = (station) => {
    // Assuming station has a 'directionsLink' property containing the link for directions
    if (station.directionsLink) {
      Linking.openURL(station.directionsLink);
    } else {
      // Default link for directions
      const defaultDirectionsLink = 'https://www.google.com/maps/dir/?api=1&destination=';
      // Replace with the actual coordinates of the station
    //   const stationCoordinates = ${station.latitude},${station.longitude};
    //   Linking.openURL(defaultDirectionsLink + stationCoordinates);
    }
  };

  const Reduce = async ()=>{
    if(con.cash<20){
      Alert.alert("Please recharge your wallet!")
    }
    else if(con.cash>=20){


  // const sendMessage = async () => {
    try {
      await axios.post('https://projectgg-server.onrender.com/receiveData', { message });
      console.log('Message sent to Node server');
    } catch (error) {
      console.error('Error sending message to Node server:', error);
    }
  




      con.setCash(con.cash-20)
      navigation.navigate("Wallet");
    }
  }

  const handleContinue = () => {
     navigation.navigate("HomeScreen");
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawbutton}>
        <Button title="=" onPress={() => drawer.current.openDrawer()} />
      </View>
      
<MapView style={styles.map} region={mapRegion}>
  {/* Your user location marker */}
  {isMarker && <Marker coordinate={mapRegion} title="Marker" />}
  
  {/* Plotting nearby station markers */}
  {nearbyStations.map((station, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.name}
      pinColor={station.type === 'green' ? 'green' : 'red'}
      onPress={() => handleStationClick(station)}
    />
  ))}
</MapView>
      <View style={styles.top}>
        <View style={styles.total}>
          <View style={styles.row1}>
            <Text style={styles.label1}>From</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFrom}
              placeholder="your location"
              value={from}
            />
          </View>
          <View style={styles.row2}>
            <Text style={styles.label2}>To</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTo}
              placeholder="Choose destination location"
              value={to}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Get Live Location"
          onPress={executeUserLocation}
          style={styles.button}
        />
      </View>
      <View style={styles.butContainer}>
        {/* <Button
          title="Start"
            onPress={Reduce}
          style={styles.but}
          color="red"
        /> */}
        <Button
          title="Continue"
            onPress={handleContinue}
          style={styles.but}
          color="red"
        />
      </View>
      
    </View>
  );
}
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -30,
  },
  total: {
    flex: 1,
    marginTop: -50,
  },
  label1: {
    width: 60, // Adjust the width of the label according to your design
    marginRight: 10,
    marginTop: 70,
    fontWeight: "bold",
    fontSize: 18, // Adjust the font size based on your design
  },
  label2: {
    width: 60, // Adjust the width of the label according to your design
    marginRight: 10,
    marginTop: 70,
    fontWeight: "bold",
    fontSize: 18, // Adjust the font size based on your design
  },

  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "35%", // Adjust the height as needed
    backgroundColor: "white",
    alignItems: "center",
    zIndex: 1,
  },
  butContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    right: 20,
    alignItems: "flex-end",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: "100%",
    alignItems: "baseline",
  },
  button: {
    width: "60%", // Adjust the width as needed
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  input: {
    height: 40,
    width: 200,
    top: 30,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 0,
  },
});