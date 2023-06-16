import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Picker } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

export default function CartCard(props) {
  const { cart, updateTotalPrice } = props;
  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedPrice, setSelectedPrice] = useState(cart?.price);

  useEffect(() => {
    const newPrice = parseInt(selectedValue) * cart?.price;
    setSelectedPrice(newPrice);
    updateTotalPrice(cart?.price, newPrice);
  }, [selectedValue, cart]);

  const handlePriceChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    return () => {
      // Restaurar el precio anterior cuando el componente se desmonte
      updateTotalPrice(selectedPrice, cart?.price);
    };
  }, []);

  return (
    <>
      <TouchableWithoutFeedback style={styles.touchable}>
        <View style={styles.card}>
          <View style={styles.spacing}>
            <View style={styles.bgStyles}>
              <View style={{ width: '65%', paddingLeft: 20, justifyContent: 'space-between' }}>
                <View
                  style={{
                    width: '100%',
                    height: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16, paddingRight: 4 }}>{cart?.title}</Text>
                  <View style={{ height: 100, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>${selectedPrice}</Text>
                    <Picker selectedValue={selectedValue} onValueChange={handlePriceChange} style={{ width: 50 }}>
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                    </Picker>
                  </View>
                </View>
              </View>
              <Image source={{ uri: `${cart?.cover_photo}` }} style={{ width: '35%', height: 100 }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row',
  },
  card: {
    width: '100%',
  },
  spacing: {
    padding: 1,
  },
  bgStyles: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: '#2488ed30',
    padding: 15,
  },
});
