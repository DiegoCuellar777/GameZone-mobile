import React from 'react';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { Provider } from 'react-redux'
 import store from './src/store/store' 

export default function App() {

  return (
   <Provider store={store}>
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
 </Provider>
  );
}