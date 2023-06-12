import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import GamesCard from './GamesCard'


const GameList = ({games}) => {

    console.log(games)
  return (
    <View>
      <Text style={{color:"white"}}>GameList</Text>
      <FlatList 
        data= {games}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(game)=>String(game._id)}
        renderItem={({item})=><GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}>
        
      </FlatList>
    </View>
  )
}
export default GameList

const styles = StyleSheet.create({
    flatListContainer:{
        backgroundColor:"#00000095",
        paddingHorizontal:5,
    }
}) 