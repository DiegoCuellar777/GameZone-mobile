import React, { useEffect, useState } from 'react'
import { View, Text} from 'react-native'
import { getGamesFavoriteApi} from '../api/favorite'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import FavList from '../components/FavsList'

export default function Favorites() {
  const [favs, setGames] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
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
  }, [auth]);

  useEffect(() => {
    console.log(favs);
  }, [favs]);

  return (
    <View>
      {auth ? (
        <FavList favs={favs}></FavList>
      ) : (
        <Text>No estás logueado</Text>
      )}
    </View>
  );
}