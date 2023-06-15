import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import FavoritesScreen from '../screens/Favorites'
import Details from "../screens/Details"
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator()

export default function FavoriteNavigation() {
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
            <Stack.Screen
                name="Favoritess"
                component={FavoritesScreen}
                options={{
                    title:"Favorites",
                    headerShown: true,
                    headerStyle: {
                    backgroundColor: 'black',
                    color:"white"
                    },
                    headerTitleStyle: {
                    color: 'white',
                    },
                    headerTitleAlign: 'center',
                }}
/>

            <Stack.Screen 
                name = "Details"
                options={{
                    title:"",
                    headerStyle: {
                        backgroundColor: 'black',
                        color:"white"
                        },
                    }}
                component={Details}/>
        </Stack.Navigator>
    )
}