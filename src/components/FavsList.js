import {Text, FlatList, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import GamesCard from './GamesCard'



const FavList = ({games}) => {

  return (
    <ScrollView>
      <FlatList 
        data= {games}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(game)=>String(game?._id)}
        renderItem={({item})=><GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}>
      </FlatList>
    </ScrollView>
  )
}
export default FavList

const styles = StyleSheet.create({
    flatListContainer:{
        backgroundColor:"#000000",
        paddingHorizontal:5,
    }
}) 