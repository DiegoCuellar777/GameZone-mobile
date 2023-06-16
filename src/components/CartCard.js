import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Picker } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';

export default function CartCard(props) {
  const { cart, updateTotalPrice } = props;
  const [selectedValue, setSelectedValue] = useState('1');
  const [selectedPrice, setSelectedPrice] = useState(cart?.price);
  const [previousPrice, setPreviousPrice] = useState(cart?.price);

  useEffect(() => {
    const newPrice = parseInt(selectedValue) * cart?.price;
    setSelectedPrice(newPrice);
    updateTotalPrice(previousPrice, newPrice);
    setPreviousPrice(newPrice);
  }, [selectedValue]);

  const handlePriceChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    return () => {
      // Restaurar el precio anterior cuando el componente se desmonte
      updateTotalPrice(selectedPrice, cart?.price);
    };
  }, []);

  const generatePickerItems = () => {
    const stock = cart?.stock;
    const pickerItems = [];

    for (let i = 1; i <= stock; i++) {
      pickerItems.push(<Picker.Item label={String(i)} value={String(i)} key={String(i)} />);
    }

    return pickerItems;
  };

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
                      {generatePickerItems()}
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
