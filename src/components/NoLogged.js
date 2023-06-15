import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function NoLogged() {
    const navigation = useNavigation()
    const image = "../../assets/luis.png"
  return (
    <View style={styles.content}>
        <Image style={styles.image} source={require("../../assets/luis.png")}/>
        <Text style={styles.text}>To add favorites or add items to the cart, please log in</Text>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    content:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    text:{
        color: "white",
        fontSize:18,
        textAlign:'center',
        marginHorizontal:30,
        marginTop:-40
    },
    button: {
        backgroundColor: '#0174DF',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical:20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image:{
        width:200,
        height:200
    }
})
