import {Text, FlatList, StyleSheet, View} from 'react-native'
import React from 'react'
import CartCard from './CartCard'



const CartItems = ({cart, updateTotalPrice}) => {

  return (
    <View>
      <FlatList 
        data= {cart}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(fav)=>String(fav?.title)}
        renderItem={({item})=><CartCard cart={item} updateTotalPrice={updateTotalPrice} />}
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