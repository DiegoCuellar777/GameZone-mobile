import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text} from 'react-native'
import { getGamesFavoriteApi} from '../api/favorite'
import useAuth from '../hooks/useAuth'
import { Button } from 'react-native'
import axios from 'axios'
import FavList from '../components/FavsList'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'

export default function Favorites() {
  const [favGames, setFavGames] = useState([]);
  const { auth } = useAuth();

useEffect(() => {
  if (auth) {
    (async () => {
      const response = await getGamesFavoriteApi()
      console.log(response);
    })()
  }
}, [auth])


  return (
    <SafeAreaView>
      {auth ? (
        <Button title="hola" />
      ) : (
        <Text>No estás logueado</Text>
      )}
    </SafeAreaView>
  );
}
