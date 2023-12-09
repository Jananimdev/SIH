import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import SignUp from './src/SignUp';
import { AuthContext } from './Context';
import SignIn from './src/SignIn';
import Home from './src/Home';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Sign In" headerMode="none">
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

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs" headerMode="none">
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
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
