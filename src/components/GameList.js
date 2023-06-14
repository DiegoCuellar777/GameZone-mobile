import { Text, FlatList, StyleSheet, View, Image, ScrollView,Button } from 'react-native'
import React from 'react'
import { Input } from 'react-native-elements'
import { useEffect, useState, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons'
import GamesCard from './GamesCard'
import icono from '../../assets/icono.png'

import luis from '../../assets/luis.png'
import { WebView } from 'react-native-webview'
// import game_action from '../store/actions/game'
// import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import api from '../../api';


// let {game_read} = game_action

const GameList = ({games}) => {

    // let dispatch = useDispatch()
    // let store=useSelector(store=> console.log(store)) 
    const [reload, setReload] = useState(false)
    const categoryRef = useRef([]);
    const titleRef = useRef("");
    const captureText = () => {
      setReload(!reload);
    };

  useEffect(() => {
    let categories = Object.values(categoryRef.current);
    let values = [];
    categories.forEach((each) => {
        if (each.checked) {
            values.push(each.value);
        }
    })
    axios(
        api +
        `games?title=${titleRef.current}&category_id=${values.join(",")}`
    )
        .then((res) => {
            setMangas(res.data.response);
           
        })
}, [ reload])

  return (

    <ScrollView style={{ display: 'flex' }}>
      <View style={{ width: '100%', height: 250, backgroundColor: 'red', display: 'flex', alignItems: 'center',justifyContent:'space-between'}} >
     
        <View style={{ width: '95%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image source={luis} style={{ width: 60, height: 60 }}></Image>
          <Image source={icono} style={{ width:40, height: 40 }}></Image>
        </View>
        <View style={{backgroundColor:'green',height:100,alignItems:'center'}}>
        <WebView
          style={{width:1000}}
          source={{ uri: 'https://giphy.com/embed/UctoTPBIjNQaIryi6l' }}
          scalesPageToFit={false}
        />
        </View>

        <Input
          style={{ fontSize: 20, width: 500, padding: 4, marginTop: 10, borderRadius: 20, backgroundColor: "white" }}
          leftIcon={<FontAwesome name="search" size={24} color="black" style={{ marginTop: 10, position: 'absolute', top: 30 }} />}

          defaultValue={titleRef.current}
          placeholder="Find your manga here"
          onChangeText={(text) => {
            titleRef.current = text;
            captureText();
          }}

        />

      </View>
      <Text style={{ color: "white" }}>GameList</Text>
      <FlatList
        data={games}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(game) => String(game._id)}
        renderItem={({ item }) => <GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}>

      </FlatList>
    </ScrollView>
  )
}
export default GameList

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: "#000000",
    paddingHorizontal: 5,


  },


}) 