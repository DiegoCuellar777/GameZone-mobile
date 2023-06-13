import React from 'react'
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { useEffect, useState, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function profile() {
    const navigation = useNavigation()

  const [token, setToken] = useState(null);
  const isFocused = useIsFocused();
  let email = JSON.parse(localStorage.getItem("user"))?.email;
  const checkToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    } catch (error) {
      console.log(error);
    }
  };
  return (
  <View>

  </View>
  )
}
