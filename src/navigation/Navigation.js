import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Favorites from "./FavoriteNavigation"
import Home from "./HomeNavigation"
import Cart from "./CartNavigation"


const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle : {backgroundColor: "#0174DF"},
        tabBarInactiveTintColor: "white"
      }}
    >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name='home' color={color} size={size}/>
            ),
            headerShown: false
          }}/>
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name='heart' color={color} size={size}/>
            ),
            headerShown: false
          }}/>
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Cart",
            tabBarIcon: ({color,size}) => (
              <MaterialCommunityIcons name='cart' color={color} size={size}/>
            ),
            headerShown: false
          }}/>
    </Tab.Navigator>
  )
}