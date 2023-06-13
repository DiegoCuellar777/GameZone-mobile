import {Text, FlatList, StyleSheet , Scrol, ScrollView} from 'react-native'
import React from 'react'
import GamesCard from './GamesCard'



const GameList = ({games}) => {

  return (
    <ScrollView>
      <Text style={{color:"white"}}>GameList</Text>
      <FlatList 
        data= {games}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(game)=>String(game._id)}
        renderItem={({item})=><GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}>
        
      </FlatList>
    </ScrollView>
  )
}
export default GameList

const styles = StyleSheet.create({
    flatListContainer:{
        backgroundColor:"#000000",
        paddingHorizontal:5,
    }
}) 