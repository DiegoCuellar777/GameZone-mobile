import {Text, FlatList, StyleSheet, View} from 'react-native'
import React from 'react'
import FavCard from './FavCard'



const FavList = ({favs}) => {

  return (
    <View>
      <FlatList 
        data= {favs}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(fav)=>String(fav?.title)}
        renderItem={({item})=><FavCard favs={item} />}
        contentContainerStyle={styles.flatListContainer}>
      </FlatList>
    </View>
  )
}
export default FavList

const styles = StyleSheet.create({
    flatListContainer:{
        backgroundColor:"#000000",
        paddingHorizontal:5,
    }
}) 