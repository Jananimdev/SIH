import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { ScrollView } from 'react-native';

const getRandomHistoryEntry = (history) => {
  // Check if history is available and not empty
  if (history && history.length > 0) {
    // Get a random index within the history array
    const randomIndex = Math.floor(Math.random() * history.length);
    // Return the history entry at the random index
    return history[randomIndex];
  }
  // Return null if history is not available or empty
  return null;
};

export const VehicleDetails = ({ route }) => {
    const navigation = useNavigation(); // Access navigation object
    const { vehicle } = route.params;
  
    // Access the first historical entry or default to an empty object
    const historyEntry = vehicle.history && vehicle.history.length > 0 ? vehicle.history[0] : {};
  
    return (
      <View style={styles.container}>
        <View style={styles.centeredContainer}>
          <Text style={styles.text}>Last Driver: {historyEntry.name || 'Arjun'}</Text>
          {/* Display other details of the last driver if available */}
  
          {/* Display travel history */}
          <View style={styles.historyContainer}>
            <Text style={styles.label}>Travel History:</Text>
            {vehicle.history && vehicle.history.length > 0 ? (
              vehicle.history.map((entry, index) => (
                <View key={index} style={styles.historyEntry}>
                  {/* Display details of each historical entry */}
                  {/* Adjust this section to display the actual travel history details */}
                  <Text style={styles.text}>
                    {`Driver: ${entry.name}, Start: ${entry.startDestination}, End: ${entry.endDestination}, Travel Time: ${entry.travelTime}`}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.text}>No travel history available for this vehicle.</Text>
            )}
          </View>
  
          {/* Display random start and end destination */}
          <Text style={styles.label}>Start: {historyEntry.startDestination || 'NGP College'}</Text>
          <Text style={styles.label}>End: {historyEntry.endDestination || 'Sitra'}</Text>
  
          {/* Display random time of travel */}
          <Text style={styles.label}>Travel Time: {historyEntry.travelTime || '1 hours 20 mins'}</Text>
  
          {/* Example button to go back */}
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
        {/* Table for displaying data */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Data Name</Text>
            <Text style={styles.tableHeader}>Value</Text>
          </View>
          {/* Display various details in the table */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Last Driver</Text>
            <Text style={styles.tableCell}>{historyEntry.name || 'Arjun'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Start Destination</Text>
            <Text style={styles.tableCell}>{historyEntry.startDestination || 'NGP College'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>End Destination</Text>
            <Text style={styles.tableCell}>{historyEntry.endDestination || 'Sitra'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Travel Time</Text>
            <Text style={styles.tableCell}>{historyEntry.travelTime || '1 hours 20 mins'}</Text>
          </View>
          {/* Add more rows for other data */}
        </View>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centeredContainer: {
    width: '80%',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  historyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  historyEntry: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // Table styles
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
  },
  tableCell: {
    flex: 1,
  },
  tableScrollView: {
    maxHeight: 200,
  },
  headerCell: {
    flexDirection: 'row',
    minWidth: 140,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  detailsCell: {
    flexDirection: 'column',
    minWidth: 140,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

// export default VehicleDetails;
