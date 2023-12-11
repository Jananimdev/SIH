import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  vehicleList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vehicleCard: {
    width: '48%', // Adjust width as needed
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  vehicleImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 8,
  },
  vehicleNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text within the card
  },
  // Add other styles for vehicle details if needed
});

export const StationedVehicles = ({ navigation }) => {
  const stationedVehicles = [
    // Your array of stationed vehicles data here
    // Example:
    {
      id: 1,
      rider: 'SGBK10001',
      bikeImage: require('./vehicleimg/bike8.jpg'),
      coordinates: {
        vehicle_ID: 10001,
        latitude: 11.0614634,
        longitude: 77.0371916,
      },
    },
    {
      id: 2,
      rider: 'SGBK10002',
      bikeImage: require('./vehicleimg/bike9.jpg'),
      coordinates: {
        vehicle_ID: 10002,
        latitude: 11.0387418,
        longitude: 77.0374052,
      },
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Stationed Vehicles</Text>
      <View style={styles.vehicleList}>
        {stationedVehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={styles.vehicleCard}
            onPress={() => navigation.navigate('VehicleDetails', { vehicle })}>
            <Image source={vehicle.bikeImage} style={styles.vehicleImage} />
            <Text style={styles.vehicleNumber}>{vehicle.rider}</Text>
            {/* Add other vehicle details if needed */}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// export default StationedVehicles;
