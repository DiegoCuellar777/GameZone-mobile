import {Text, FlatList, StyleSheet, View} from 'react-native'
import React from 'react'
import CartCard from './CartCard'



const CartItems = ({cart, handlePriceChange }) => {

  return (
    <View>
      <FlatList 
        data= {cart}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(fav)=>String(fav?.title)}
        renderItem={({item})=><CartCard cart={item} onPriceChange={handlePriceChange}/>}
        contentContainerStyle={styles.flatListContainer}>
      </FlatList>
    </View>
  )
}
export default CartItems

const styles = StyleSheet.create({
    flatListContainer:{
        backgroundColor:"#000000",
        paddingHorizontal:5,
    }
}) 