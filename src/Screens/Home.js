import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { createStackNavigator } from "@react-navigation/stack";
import Coupens from "./Coupens";
import Wallet from "./Wallet";
import {
  StyleSheet,
  Pressable,
  View,
  Button,
  TextInput,
  Text,
} from "react-native";
import * as Location from "expo-location";

function Home() {
  const drawer = useRef(null);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const Stack = createStackNavigator();

  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
    console.log(location);
  };
  const executeUserLocation = () => {
    userLocation();
  };

  return (
    <View style={styles.container}>
      <View style={styles.drawbutton}>
        <Button title="=" onPress={() => drawer.current.openDrawer()} />
      </View>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker"></Marker>
      </MapView>
      <View style={styles.top}>
        <View style={styles.total}>
          <View style={styles.row1}>
            <Text style={styles.label1}>From</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFrom}
              placeholder="Choose starting location"
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
        <Button
          title="Start"
          //   onPress={}
          style={styles.but}
          color="red"
        />
      </View>
    </View>
  );
}
export default Home;

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
