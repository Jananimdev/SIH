import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AppContext } from '../Context';

const Home = () => {
  const { Gname } = AppContext();
  const [responseData, setResponseData] = useState(null);

  const handleGetRequest = async () => {
    try {
      const response = await axios.get('http://192.180.180.270:3000/signin'); // Replace with your machine's IP
      setResponseData(response.data);
      Alert.alert('GET request successful!');
    } catch (error) {
      console.error('Error making GET request:', error);
      Alert.alert(`Error making GET request: ${error.message}`);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{Gname} Welcome to Home!</Text>
      <TouchableOpacity onPress={handleGetRequest}>
        <View
          style={{
            backgroundColor: '#3498db',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ color: 'white' }}>Make GET Request</Text>
        </View>
      </TouchableOpacity>

      {responseData && (
        <View style={{ marginTop: 20 }}>
          <Text>Response from the server:</Text>
          <Text>{JSON.stringify(responseData)}</Text>
        </View>
      )}
    </View>
  );
};

export default Home;
