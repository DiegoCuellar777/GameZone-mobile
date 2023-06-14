

import { Text, FlatList, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Input } from 'react-native-elements'
import { useEffect, useState, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons'
import GamesCard from './GamesCard'
import icono from '../../assets/icono.png'
import luis from '../../assets/luis.png'
import { WebView } from 'react-native-webview'
import game_action from '../store/actions/game'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'
import inputs_filter_actions from '../store/actions/inputs_filters'
import axios from 'axios'
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from '../navigation/Navigation';


const GameList = () => {

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Obtener las cabeceras con el token
  const headers = async () => {
    const token = await getToken();
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      return {};
    }
  }



  const titleRef = useRef("");
  const categoryRef = useRef([]);

  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [page, setPage] = useState(1)
  const [reload, setReload] = useState(false)


  useEffect(() => {
    axios(api + "games")
        .then((res) => setGames(res.data.response))
        .catch((err) => console.log(err));
}, [])
console.log(games);
useEffect(() => {

    axios(api + "categories")
        .then((res) => setCategories(res.data.categories))
        .catch((err) => console.log(err));
}, [])
console.log(categories);

const captureText = () => {
    setReload(!reload);
};

useEffect(() => {
  const fetchGames = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const headersData = token ? { Authorization: `Bearer ${token}` } : {};

      let categories = Object.values(categoryRef.current);
      let values = [];
      categories.forEach((each) => {
        if (each.checked) {
          values.push(each.value);
        }
      });

      const params = {
        title: titleRef.current,
        category_id: values.join(","),
        page: page,
        limit: 6,
        order: 1
      };

      const response = await axios.get(api + "games", {
        headers: headersData,
        params: params
      });

      setGames(response.data.response);
      setHasNextPage(response.data.response.length > 0);
      setHasPrevPage(page > 1);
    } catch (error) {
      console.error(error);
    }
  };

  fetchGames();
}, [page, reload])



  const navigation = useNavigation()



  let profileButton = () => {
    navigation.navigate("Profile")
  }




  const next = () => {
    if (games.length > 0) {
        setPage(page + 1);
    }
}

  const prev = () => {
    if (games) setPage(page - 1);
}

  return (
    <ScrollView style={{ display: 'flex' }}>
      <View style={{ width: '100%', height: 250, backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

        <View style={{ width: '95%', backgroundColor: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image source={luis} style={{ width: 60, height: 60 }}></Image>
          <TouchableOpacity onPress={profileButton}>
            <Image
              source={icono}
              style={{ width: 40, height: 40 }}>

            </Image>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'green', height: 100, alignItems: 'center', width: 500 }}>
          <WebView
            style={{ width: 300, height: 100 }}
            source={{ uri: 'https://giphy.com/embed/UctoTPBIjNQaIryi6l' }}

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
        keyExtractor={(game) => String(game.title)}
        renderItem={({ item }) => <GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}>

      </FlatList>
      <View style={{backgroundColor:'red',width:'100%',height:50,display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        {hasPrevPage&&
        <TouchableOpacity onPress={prev} style={{width:30,height:20,backgroundColor:'green'}}>
         <Text>previus</Text>
        </TouchableOpacity>}
      {hasNextPage&&<TouchableOpacity on onPress={next} style={{width:30,height:20,backgroundColor:'blue'}}>
         <Text>next</Text>
        </TouchableOpacity>}
        
      </View>
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