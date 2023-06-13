import React from 'react'
import { SafeAreaView, Text, Button } from 'react-native'
import { getGamesFavoriteApi} from '../api/favorite'

export default function Favorites() {


const checkFavorites = async () => {
  const response = await getGamesFavoriteApi()
    console.log(response);
}

  return (
    <SafeAreaView>
      <Text>Favorites</Text>
      <Button title="Obtener favs" onPress={checkFavorites} />
    </SafeAreaView>
  )
}