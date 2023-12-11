import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons'; 
import Geocoder from 'react-native-geocoding';

export function RunningVehiclesPage() {
  const [runningVehicles, setRunningVehicles] = useState([
    {
      id: 1,
      rider: 'John Doe',
      bikeImage: require('./vehicleimg/bike8.jpg'),
      coordinates: {
        vehicle_ID: 10001,
        latitude: 11.0614634,
        longitude: 77.0371916,
      },
    },
    {
        id: 2,
        rider: 'Alice Johnson',
        bikeImage: require('./vehicleimg/bike10.jpg'),
        coordinates: {
          vehicle_ID: 10002,
          latitude: 11.0387418,
          longitude: 77.0374052,
        },
      },
     
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(null);


  
  const mapRef = useRef(null);
  const calculateMarkerSize = () => {
    // Set your base marker size here
    const baseSize = 1;

    if (zoomLevel !== null) {
      // Calculate marker size based on the zoom level
      // You may need to adjust this formula based on your requirement
      const calculatedSize = baseSize * zoomLevel;
      return calculatedSize;
    }

    return baseSize;
  };
  useEffect(() => {
    setIsMapReady(true);
  }, []);

  const handleMapLayout = () => {
    setIsMapReady(true);
  };

  const toggleRidersInfo = (vehicleId) => {
    setSelectedVehicle(selectedVehicle === vehicleId ? null : vehicleId);
  };

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

 const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from({ latitude, longitude });
      const address = response.results[0].formatted_address;
      return address;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not found';
    }
  };

  const calculateMapBounds = () => {
    if (mapRef.current && runningVehicles.length > 0 && isMapReady) {
      let coordinates = runningVehicles.map((vehicle) => vehicle.coordinates);

      const edgePadding = { top: 50, right: 50, bottom: 50, left: 50 };

      // Get the map dimensions
      const { width, height } = Dimensions.get('window');

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding,
        animated: true,
      });
    }
  };

  useEffect(() => {
    calculateMapBounds();
  }, [isMapReady]);

  const renderRiderInfo = () => {
    if (selectedVehicle !== null) {
      const selectedRider = runningVehicles.find((vehicle) => vehicle.id === selectedVehicle);
      const latitude = selectedRider?.coordinates?.latitude || 0; // Use 0 or any default value
      const longitude = selectedRider?.coordinates?.longitude
      const address = selectedRider?.coordinates?.address
      return (
        <View style={styles.ridersContainer}>
        <Image source={selectedRider.bikeImage} style={styles.riderImage} />
        <Text style={styles.rider}>{selectedRider.rider}</Text>
        <Text>{`Latitude: ${latitude}`}</Text>
        <Text>{`Longitude: ${longitude}`}</Text>
        <Text>{`Address: ${address}`}</Text>
      </View>
      );
      }
    return null;
  };
 


  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          onLayout={handleMapLayout}
          onRegionChangeComplete={(region) => setZoomLevel(region.zoom)}
        >
          {isMapReady &&
            runningVehicles.map((vehicle) => (
              <Marker
                key={vehicle.id}
                coordinate={vehicle.coordinates}
                title={`Rider: ${vehicle.rider}`}
                onPress={() => toggleRidersInfo(vehicle.id)}
                image={require('./icon3.png')} // Replace with your bike icon
                iconSize={calculateMarkerSize()}
              />
            ))}
        </MapView>
        {renderRiderInfo()}
        {selectedVehicle !== null && (
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => toggleRidersInfo(selectedVehicle)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Vehicle Cards ScrollView */}
      {/* ... your ScrollView and other components */}
    </View>
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedVehicles = runningVehicles.map((vehicle) => ({
        ...vehicle,
        coordinates: {
          ...vehicle.coordinates,
          latitude: vehicle.coordinates.latitude + Math.random() * 0.01, // Update latitude randomly
          longitude: vehicle.coordinates.longitude + Math.random() * 0.01, // Update longitude randomly
        },
      }));
      setRunningVehicles(updatedVehicles);
    }, 1000); // Change the interval according to your requirement (here, it's set to 5 seconds)

    return () => clearInterval(interval);
  }, [runningVehicles]);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  vehicleCard: {
    alignItems: 'center',
    marginBottom: 25,
  },
  bikeImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  riderName: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'sans-serif',
  },
  mapContainer: {
    flex: 1,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  ridersContainer: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 8,
    zIndex: 1,
    maxHeight: 300,
    overflow: 'scroll',
  },
  rider: {
    marginBottom: 5,
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
  riderImage: {
    width: 50,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
});