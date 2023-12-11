// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Home = ({ navigation }) => {
  const [vehicleID, setVehicleID] = React.useState("");

  const handleContinue = () => {
    navigation.navigate("NextPage", { vehicleID });
  };

  return (
    <View style={styles.container}>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
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
