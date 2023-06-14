import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { useEffect, useState, useRef } from "react";
import b from '../../assets/calidad5.webp'
import useAuth from '../hooks/useAuth';


import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Dimensions, TextInput, Image, TouchableHighlight, } from 'react-native';


import axios from "axios";
import api from "../../api";



const Profile = () => {
  const navigation = useNavigation()
  const {login, auth} = useAuth()
console.log(auth);
 

  return (
    <ImageBackground source={b} style={styles.container}>
      <View style={{width:'80%',alignItems:'center',height:400,justifyContent:'space-around'}}>
        <Image style={{width:150,height:150,borderRadius:80}} source={{uri:auth.photo }}></Image>
        <Text style={{fontSize:15,fontWeight:'bold',color:'black',backgroundColor: 'rgba(255, 255, 255, 0.6)',borderRadius:12,padding:20,width:'70%',height:5, textAlign: 'center',marginBottom:30}}>{auth.email}</Text>
        <TouchableOpacity /* onPress={logout} */ style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'white', height: 50, width: 200, borderRadius: 15, marginTop: 10 }}>
        <Text style={styles.buttonText}>logout</Text>
        </TouchableOpacity>
        </View>
      
    </ImageBackground>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',
        width:'100%',
    justifyContent:'center',
        alignItems:'center',
       

    },
    buttonText: {
      color: '#66B2CE',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
      alignContent: 'center',
      alignItems: 'center',
      textAlign:'center',borderRadius:100
    }
})

export default Profile
