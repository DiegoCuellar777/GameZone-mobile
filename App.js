import React from 'react';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}