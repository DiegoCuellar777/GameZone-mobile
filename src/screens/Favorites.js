import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, Text, ScrollView} from 'react-native'
import { getGamesFavoriteApi} from '../api/favorite'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import FavList from '../components/FavsList'
import { useFocusEffect } from '@react-navigation/native'



export default function Favorites() {
  const [favs, setGames] = useState([]);
  const { auth } = useAuth();

useFocusEffect(
  useCallback(() => {
    if (auth) {
      (async () => {
        const ids = await getGamesFavoriteApi();

        let favs = [];
        for await (const id of ids) {
          const response = await axios.get(`https://game-zone-back.onrender.com/games/${id}`);
          favs.push(response.data.response);
        }
        setGames(favs);
      })();
    }
  }, [auth])
)

  

  useEffect(() => {
    console.log(favs);
  }, [favs]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {auth ? (
        <ScrollView>
          <FavList favs={favs} />
        </ScrollView>
      ) : (
        <Text>No estás logueado</Text>
      )}
    </SafeAreaView>
  );
}
