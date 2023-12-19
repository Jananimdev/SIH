import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Screens/Home";
import Coupens from "../Screens/Coupens";
import Wallet from "../Screens/Wallet";
import Icon from "react-native-vector-icons/FontAwesome"; // You can use a different icon set, like MaterialIcons or Ionicons

const Tab = createBottomTabNavigator();

export  function BottomTab() {
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="MAPS"
        component={Home}
        options={{
          tabBarLabel: "MAPS",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={30} color="black" />
          ),
          tabBarLabelStyle: { color: "black" }, // Set the color of tabBarLabel
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarLabel: "WALLET",
          tabBarIcon: ({ color, size }) => (
            <Icon name="credit-card" size={30} color="black" />
          ),
          tabBarLabelStyle: { color: "black" }, // Set the color of tabBarLabel
        }}
      />
      <Tab.Screen
        name="Report"
        component={Coupens}
        options={{
          tabBarLabel: "Report",
          tabBarIcon: ({ color, size }) => (
            <Icon name="exclamation-circle" size={30} color="black" />
          ),
          tabBarLabelStyle: { color: "black" }, // Set the color of tabBarLabel
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
