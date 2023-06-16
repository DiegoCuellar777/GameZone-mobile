import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Text, ScrollView, StyleSheet, View } from 'react-native';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import CardItems from '../components/CartItems';
import { useFocusEffect } from '@react-navigation/native';
import NoLogged from '../components/NoLogged';
import { getGamesCartApi } from '../api/cart';
import { TouchableOpacity } from 'react-native-web';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const { auth } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          const ids = await getGamesCartApi();

          let cart = [];
          for await (const id of ids) {
            const response = await axios.get(`https://game-zone-back.onrender.com/games/${id}`);
            cart.push(response.data.response);
          }
          setCart(cart);
        })();
      }
    }, [auth])
  );

  useEffect(() => {
    // Calcular el valor inicial del total
    const initialTotalPrice = cart.reduce((total, item) => total + item.price, 0);
    setTotalPrice(initialTotalPrice);
  }, [cart]);

  const updateTotalPrice = (previousPrice, newPrice) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice - previousPrice + newPrice);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black'}}>
      {auth ? (
        <ScrollView>
          {cart.length > 0 ? (
            <>
              <CardItems cart={cart} updateTotalPrice={updateTotalPrice} />
              <Text style={{ color: 'white', marginTop: 10, marginLeft: 10, fontSize: 18, textAlign:"center" }}>
                Total Price: ${totalPrice}
              </Text>
              <View style={{flex:1, flexDirection: "column", alignItems:"center"}}>
                <TouchableOpacity style={{backgroundColor:"#0174DF", padding:10, borderRadius: 5, margin:10}}>
                  <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Go to payment</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={{ color: 'white', marginTop: 200, textAlign: 'center', fontSize: 18 }}>
              Your Cart is empty
            </Text>
            
          )}
        </ScrollView>
      ) : (
        <NoLogged />
      )}
    </SafeAreaView>
  );
}
