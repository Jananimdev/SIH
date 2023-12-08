import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Otp from './src/Otp';
import Home from './src/Home';
import { AuthContext } from './Context';
import SignIn from './src/SignIn';



export default function App() {
  const [Gname, setGName] = useState('Sami2');
  const [Gemail, setGEmail] = useState('');
  const [Gpassword, setGPassword] = useState('');
  const [Gphno, setGPhno] = useState('');
  const [GaadharNumber, setGAadharNumber] = useState('');


  const authContextValue = {
    Gname,
    setGName,
    Gemail,
    setGEmail,
    Gpassword,
    setGPassword,
    Gphno,
    setGPhno,
    GaadharNumber,
    setGAadharNumber,
  };

  const Stack = createStackNavigator();

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Otp">
          <Stack.Screen name="Otp" component={Otp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
