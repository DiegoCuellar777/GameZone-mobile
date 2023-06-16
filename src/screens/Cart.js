import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Text, ScrollView } from 'react-native';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import CardItems from '../components/CartItems';
import { useFocusEffect } from '@react-navigation/native';
import NoLogged from '../components/NoLogged';
import { getGamesCartApi } from '../api/cart';



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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      {auth ? (
        <ScrollView>
          {cart.length > 0 ? (
            <>
              <CardItems cart={cart} updateTotalPrice={updateTotalPrice} />
              <Text style={{ color: 'white', marginTop: 10, marginLeft: 10, fontSize: 18 }}>
                Total Price: ${totalPrice}
              </Text>
            </>
          ) : (
            <Text style={{ color: 'white', marginTop: 200, textAlign: 'center', fontSize: 18 }}>
              Your Cart is empty
            </Text>
          )}
         {/*  <StripeProvider
            publishableKey="pk_test_Dt4ZBItXSZT1EzmOd8yCxonL"
            urlScheme="your-url-scheme" // Reemplaza con tu URL Scheme
            merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // Reemplaza con tu identificador de comerciante para Apple Pay
          >
            <View>
              <CardField
                postalCodeEnabled={false}
                placeholder={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: '#ECECEC',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  marginVertical: 20,
                }}
                onCardChange={(cardDetails) => {
                  console.log('cardDetails', cardDetails);
                }}
              />
            </View>
          </StripeProvider> */}
        </ScrollView>
      ) : (
        <NoLogged />
      )}
    </SafeAreaView>
  );
}
