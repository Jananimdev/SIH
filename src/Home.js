// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert, // Import Alert from React Native
} from "react-native";

const Home = ({ navigation }) => {
  const [vehicleID, setVehicleID] = React.useState("");

  const handleContinue = () => {
    const allowedVehicleIDs = ["v1", "v2", "v3"];

    if (allowedVehicleIDs.includes(vehicleID)) {
      navigation.navigate("NextPage", { vehicleID });
    } else {
      Alert.alert("Error", "Enter the correct vehicle ID");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.label}>Enter the Vehicle ID:</Text>
      <TextInput
        style={styles.input}
        placeholder="Vehicle ID"
        value={vehicleID}
        onChangeText={setVehicleID}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 80,
    borderRadius: 50,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Home;
