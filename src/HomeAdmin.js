import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the necessary functions from react-navigation

export function HomeAdmin() {
  const navigation = useNavigation(); // Access navigation functions

  const [totalVehicles, setTotalVehicles] = useState(10);
  const [runningVehicles, setRunningVehicles] = useState(0);
  const [stationedVehicles, setStationedVehicles] = useState(0);

  const handleTotalVehicles = () => {
    setTotalVehicles(10);
  };

  const handleRunningVehicles = () => {
    const runningCount = Math.floor(Math.random() * (totalVehicles + 1));
    setRunningVehicles(runningCount);
    setStationedVehicles(totalVehicles - runningCount); // Update stationedVehicles
  };

  const handleStationedVehicles = () => {
    const stationedCount = totalVehicles - runningVehicles;
    setStationedVehicles(stationedCount);
    // You might also need to update runningVehicles based on changes to stationedVehicles
    setRunningVehicles(totalVehicles - stationedCount);
  };

  const navigateToRiding = () => {
    navigation.navigate('Riding'); // Navigate to the 'Riding' screen
  };

  const navigateToTotalVehicle = () => {
    navigation.navigate('TotalVehicles'); // Navigate to the 'Riding' screen
  };

  const navigateToStationed = () => {
    navigation.navigate('Stationed'); // Navigate to the 'Riding' screen
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./vehicleimg/bike7.jpg')} style={styles.backgroundImage}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={require('./logo2.png')} style={styles.logo} />
          </View>
          <Text style={styles.title}>Green Glide</Text>
          {/* <Text style={styles.vehicleInfo}>Total Vehicles: {totalVehicles}</Text>
          <Text style={styles.vehicleInfo}>Running Vehicles: {runningVehicles}</Text>
          <Text style={styles.vehicleInfo}>Stationed Vehicles: {stationedVehicles}</Text> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={navigateToTotalVehicle}>
              <Text style={styles.buttonText}>Set Total Vehicles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateToRiding}>
              <Text style={styles.buttonText}>Check Running Vehicles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={navigateToStationed}>
              <Text style={styles.buttonText}>Check Stationed Vehicles</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'sans-serif',
    color: '#fff',
  },
  vehicleInfo: {
    fontSize: 24,
    marginBottom: 15,
    fontFamily: 'sans-serif',
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 15,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'sans-serif',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 10,
    borderRadius: 100,
    overflow: 'hidden',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
