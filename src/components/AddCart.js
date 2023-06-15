import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { addGameCartApi, isGameInCartApi, removeGameCartApi} from '../api/cart'

export default function AddCart(props) {

    const {gamePrice, id} = props
    const [isInCart, setIsInCart] = useState(undefined)
    const [reloadCheck, setReloadCheck] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await isGameInCartApi(id)
                setIsInCart(response)
            } catch (error) {
                setIsInCart(false)
            }
        })()
    }, [id, reloadCheck])

    const onReloadCheckCart = () =>{
        setReloadCheck((prev) => !prev)
    }

    const addtoCart = async () => {
        try {
            await addGameCartApi(id)
            onReloadCheckCart()  
        } catch (error) {
            console.log(error);
        }
    }

    const removeGameCart = async() =>{
        try {
            await removeGameCartApi(id)
            onReloadCheckCart()  
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={styles.container}>
        <View>
            <Text style={{ fontWeight: "bold", color: "grey" }}>Price</Text>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>USD ${gamePrice}</Text>
        </View>
        <TouchableOpacity style={{
            backgroundColor: isInCart? "white":"#0174DF",
            flexDirection:"row",
            borderRadius: 10,
            alignItems:"center",
            paddingHorizontal:5
    }} onPress={isInCart? removeGameCart : addtoCart}>
            <Text style={styles.buttonText}>{isInCart? "Remove":"Add to"} </Text>
            <Ionicons name={isInCart?"cart":'cart-outline'} color={isInCart?"#0174DF":'black'} size={24}/>
        </TouchableOpacity>
    </View>
  ) 
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        backgroundColor:"black",
        padding:5,
        alignItems:"center",
        justifyContent:"space-between",
        borderRadius:5
    },
    buttonText:{
        fontWeight:"bold",
        fontSize: 12
    }
  }) 