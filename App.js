import React from 'react';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux'

import store from './src/store/store'


export default function App() {

  return (
<Provider store={store}>
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    </Provider>
  );
}