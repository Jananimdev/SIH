import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import SignUp from './src/SignUp';
import { AuthContext } from './Context';
import SignIn from './src/SignIn';
import Home from './src/Home';
import { HomeAdmin } from './src/HomeAdmin';
import { BottomTab } from './src/BottomTabNav/BottomTab';
import { RunningVehiclesPage } from './src/Riding';
import { TotalVehicles } from './src/TotalVehicles';
import { StationedVehicles } from './src/Stationed';
import { VehicleDetails } from './src/VehicleDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// Hello World
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Sign In" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [Gname, setGName] = useState('');
  const [Gemail, setGEmail] = useState('');
  const [Gpassword, setGPassword] = useState('');
  const [Gphno, setGPhno] = useState('');
  const [GaadharNumber, setGAadharNumber] = useState('');
  const [isGAdmin, setGAdmin] = useState('');
  const [cash, setCash] = useState(200);

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
    isGAdmin,
    setGAdmin,
    cash,
    setCash
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs"  screenOptions={{headerShown:false}} >
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="HomeScreen" component={Home} />
          <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
          <Stack.Screen
          name="NextPage"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Riding" component={RunningVehiclesPage} options={{ title: 'Riding' }} />
        <Stack.Screen name="TotalVehicles" component={TotalVehicles} options={{ title: 'TotalVehicles' }} />
        <Stack.Screen name="Stationed" component={StationedVehicles} options={{ title: 'Stationed' }} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
     
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}} >
      <Tab.Screen
        name="LOG IN"
        component={AuthStack}
        options={{
          tabBarLabel: 'LOG IN',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="sign-in" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SIGN UP"
        component={SignUp}
        options={{
          tabBarLabel: 'SIGN UP',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-plus" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};