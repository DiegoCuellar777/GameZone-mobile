import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import HomeScreen from '../screens/Home'
import Details from '../screens/Details'
import { Ionicons } from '@expo/vector-icons';
import Favorite from '../components/Favorite';
import Profile from '../screens/Profile';
const Stack = createStackNavigator()

export default function HomeNavigation() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: 'black' },
      headerTintColor: 'white',
      headerBackTitleStyle: { color: '#0174DF' },
      headerBackImage: () => (
        <Ionicons name="chevron-back" size={24} color="#0174DF" />
      ),
    }}>
      <Stack.Screen name="Games" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Details" component={Details}/>

      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>


    </Stack.Navigator>
  )
}