import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';


// Function to generate a random charge status
const generateRandomCharge = () => {
  const chargeStatus = Math.floor(Math.random() * 100); // Generates a random number between 0 and 100 for charge status
  return `${chargeStatus}%`; // Returns a string representing the charge percentage
};

const vehiclesData = [
  {
    id: 10001,
    name: 'SGBK10001',
    image: require('./vehicleimg/bike8.jpg'), // Update the image path accordingly
    info: 'Fast charged and long ranged vehicle',
    batteryPack: '200 kWh',
    totalRange: '300 miles',
    charge: generateRandomCharge(), // Generate a random charge status for Vehicle 1
  },
  {
    id: 10002,
    name: 'SGBK10002',
    image: require('./vehicleimg/bike9.jpg'),
    info: 'Fast charged and long ranged vehicle',
    batteryPack: '180 kWh',
    totalRange: '280 miles',
    charge: generateRandomCharge(),
  },
  
];

export const TotalVehicles = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {vehiclesData.map((vehicle) => (
            <View style={styles.vehicleCard} key={vehicle.id}>
              <Image style={styles.vehicleImage} source={vehicle.image} />
              <View style={styles.vehicleInfo}>
                <Text style={styles.heading}>{vehicle.name}</Text>
                <Text style={styles.info}>{vehicle.info}</Text>
                <View style={styles.details}>
                  <Text style={styles.detailText}>Battery Pack: {vehicle.batteryPack}</Text>
                  <Text style={styles.detailText}>Total Range: {vehicle.totalRange}</Text>
                  <Text style={styles.detailText}>Charge: {vehicle.charge}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: 20,
    },
    vehicleCard: {
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      margin: 10,
      padding: 20,
      width: 250,
    },
    vehicleImage: {
      borderRadius: 8,
      height: 185,
      resizeMode: 'cover',
      width: '100%',
    },
    vehicleInfo: {
      marginTop: 15,
      alignItems: 'center',
    },
    heading: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    info: {
      fontSize: 14,
      color: '#555',
      marginBottom: 10,
    },
    details: {
      marginTop: 1,
    },
    detailText: {
      fontSize: 15,
      color: '#000',
      marginBottom: 3,
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingVertical: 20,
      },
  });
  
