import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import CartScreen from '../screens/Cart'

const Stack = createStackNavigator()

export default function CartNavigation() {
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
            <Stack.Screen name="Carts" component={CartScreen}
                options={{
                    title:"Cart",
                    headerShown: true,
                    headerStyle: {
                    backgroundColor: 'black',
                    color:"white"
                    },
                    headerTitleStyle: {
                    color: 'white',
                    },
                    headerTitleAlign: 'center',
                }}/>
        </Stack.Navigator>
    )
}