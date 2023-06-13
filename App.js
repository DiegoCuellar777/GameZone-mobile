<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { Tab, Text, TabView, Input, Icon } from '@rneui/themed';
import logo from './assets/luis.png'
import axios from 'axios';
import api from './api'
import Modal from 'react-native-modal';
import GameList from './src/components/GameList';
import inputs_filter_actions from './src/store/actions/inputs_filters'
import {useSelector,useDispatch,} from 'react-redux'
import { Provider } from 'react-redux';
import store1 from './src/store/store'
=======
import React from 'react';
import Navigation from './src/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
>>>>>>> 5d65069151d30080e46bcbced12a133d30f7b7c8




const { inputs_filter } = inputs_filter_actions

export default function App() {

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}