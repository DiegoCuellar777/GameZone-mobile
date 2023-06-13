import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import CartScreen from '../screens/Cart'

const Stack = createStackNavigator()

export default function CartNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Carts" component={CartScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}