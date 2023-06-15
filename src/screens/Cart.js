import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView, Text, ScrollView} from 'react-native'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import CardItems from '../components/CartItems'
import { useFocusEffect } from '@react-navigation/native'
import NoLogged from '../components/NoLogged'
import { getGamesCartApi } from '../api/cart'




export default function Cart() {
  const [cart, setCart] = useState([]);
  const { auth } = useAuth();

  const [totalPrice, setTotalPrice] = useState(0);

  const handleItemPriceChange = (price) => {
    let updatedCart = [...cart];
    updatedCart.forEach((item) => {
      if (item.id === price.id) {
        item.price = price;
      }
    });
    setCart(updatedCart);
  };

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
)

useEffect(() => {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  setTotalPrice(total);
}, [cart]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:"black",}}>
      {auth ? (
        <ScrollView>
          {cart.length > 0 ? (
          <>
            <CardItems cart={cart}  onItemPriceChange={handleItemPriceChange} />
            <Text style={{ color: 'white', marginTop: 20, textAlign: 'center', fontSize: 18 }}>
              Total: ${totalPrice}
            </Text>
          </>
            
          ) : (
              <Text style={{color:"white", marginTop:200, textAlign:"center", fontSize:18}}>
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
