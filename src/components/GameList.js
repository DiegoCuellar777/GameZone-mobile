import { View, Text, FlatList } from 'react-native'
import React from 'react'

const GameList = (props) => {

    const { games } = props
    console.log(games)
  return (
    <View>
      <Text style={{color:"white"}}>GameList</Text>
      <FlatList 
        data={games}
        numColumns={2}
        showsVerticalScrollIndicator={false}>
        
      </FlatList>
    </View>
  )
}

export default GameList