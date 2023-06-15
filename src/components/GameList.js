
import { Text, FlatList, StyleSheet, View, Image, ScrollView, Button, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Input } from 'react-native-elements'
import { CheckBox } from 'react-native-elements';

import { useEffect, useState, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons'
import GamesCard from './GamesCard'
import { useSelector, useDispatch } from 'react-redux'


import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import inputs_filter_actions from '../store/actions/inputs_filters'
import gameon from '../../assets/gameon.png'




const { inputs_filter } = inputs_filter_actions

const GameList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { title, categories } = useSelector(store => store.inputs);

  const [games, setGames] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [categor, setCategor] = useState([]);
  const [openCatgories, setOpenCategories] = useState(false)




  let open = () => {
    setOpenCategories(prevState => !prevState)
  }

  const titleRef = useRef("");
  const categoryRef = useRef([]);
  const buscador = useRef();
  const category_id = useRef();

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

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
  };

  useEffect(() => {
    axios(api + "games")
      .then((res) => setGames(res.data.response))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios(api + 'categories')
      .then(res => {
        const categoriesWithChecked = res.data.categories.map(category => ({
          ...category,
          checked: false
        }));
        setCategor(categoriesWithChecked);
      })
      .catch(err => console.error(err));
  }, []);

  const captureText = () => {
    setReload(!reload);
  };

  const capture = () => {
    const categoryValues = categor;

    if (categoryValues && categoryValues.length > 0) {
      const selectedCategories = categoryValues
        .map(each => ({
          ...each,
          checked: each.checked || false
        }))
        .filter(each => each.checked)
        .map(each => each._id);

      dispatch(inputs_filter({
        title: titleRef.current,
        categories: selectedCategories
      }));
    }

    setReload(!reload);
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const headersData = token ? { Authorization: `Bearer ${token}` } : {};

        const selectedCategories = categor.filter(category => category.checked).map(category => category._id);

        const params = {
          title: titleRef.current,
          category_id: selectedCategories.join(","),
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
  }, [page, reload, categor]);

  const options = () => {
    return (
      <View style={{ flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }}>
        <TouchableOpacity style={{ marginTop: -0.5, display: 'none' }} onPress={capture}>
          <View style={{ width: 20, height: 50, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>

          </View>
          <CheckBox style={{ color: 'white', backgroundColor: 'black' }} name="category_id" onPress={capture} checked={categories && categories.length === categor.length} containerStyle={{ display: 'none' }} />
        </TouchableOpacity>

        {categor?.map(a => (
          <View style={{ display: 'flex', flexDirection: 'column'}} key={a._id}>
            <TouchableOpacity
              onPress={() => {
                a.checked = !a.checked;
                capture();
              }}
              style={{
                cursor: 'pointer',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                backgroundColor: a.checked ? '#155E75' : '#314457',
                color: 'white',
                padding: 12,
                borderRadius: 5,
                fontSize: 11,
                textAlign: 'center',
                margin:3,
                ...(categories && categories.includes(a._id) ? { borderWidth: 1, borderColor: 'white' } : {}),
              }}
            >
              <Text style={{ fontWeight: 'bold', color: a.checked ? 'white' : 'white' }}>{a.name.charAt(0).toUpperCase() + a.name.slice(1)}</Text>
              <CheckBox name="category_id" onPress={() => {
                a.checked = !a.checked;
                capture();
              }} checked={a.checked} containerStyle={{ display: 'none' }} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };



  const next = () => {
    if (games.length > 0) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (games) setPage(page - 1);
  };

  return (
    <ScrollView style={{ display: 'flex', backgroundColor: 'black' }}>
      <View style={{ width: '100%', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'black' }} >
        <Image source={gameon} style={{ width: '100%', height: 150,marginTop:20 }} />
        <View style={{ width: '80%', height: 60, alignContent: 'center', justifyContent: 'center' }}>
          <Input
            style={{ fontSize: 20, width: '100%', padding: 4, marginTop: 10, color: 'white' }}
            leftIcon={<FontAwesome name="search" size={24} color="white" style={{ marginTop: 10, position: 'absolute', top: 8, width: 70, height: 50 }} />}
            defaultValue={titleRef.current}
            placeholder="Find your games here"
            onChangeText={(text) => {
              titleRef.current = text;
              captureText();
            }}
          />
        </View>
       
         
         <View style={{ width: '70%' }}>
          {options()}
        </View>
       
      </View>
      <Text style={{ color: "white" }}>GameList</Text>
      <FlatList
        data={games}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(game) => String(game.title)}
        renderItem={({ item }) => <GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={{ width: '100%', marginTop: 20, height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        {hasPrevPage &&
          <TouchableOpacity onPress={prev} style={{ borderWidth: 1, borderColor: '#155E75', padding: 5, borderRadius: 5, margin: 10 }}>
            <Icon name="chevron-left" size={20} color="white" />
          </TouchableOpacity>
        }
        {hasNextPage &&
          <TouchableOpacity onPress={next} style={{ borderWidth: 1, borderColor: '#155E75', padding: 5, borderRadius: 5, margin: 10 }}>
            <Icon name="chevron-right" size={20} color="white" />
          </TouchableOpacity>
        }
      </View>
    </ScrollView>
  );
};

export default GameList;



const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: "#000000",
    paddingHorizontal: 5,


  },


}) 