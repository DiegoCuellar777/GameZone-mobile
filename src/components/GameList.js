import { Text, FlatList, StyleSheet, View, Image, Scrol, ScrollView } from 'react-native'
import React from 'react'
import { Input } from 'react-native-elements'
import { useEffect, useState, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons'
import GamesCard from './GamesCard'
import icono from '../../assets/icono.png'



const GameList = ({ games }) => {

  const titleRef = useRef("");

  const [reload, setReload] = useState(false)

  const captureText = () => {
    setReload(!reload);
  };
  return (
    <ScrollView style={{display:'flex'}}>
      <View style={{ width: '100%', height: 200, backgroundColor: 'red', display: 'flex', }} >
        <View style={{width:'80%',backgroundColor:'blue',display:'flex',flexDirection:'row'}}> 
          <Text>holaaaa</Text>
          <Image source={icono} style={{ with: 20 }}></Image>
        </View>

        <Input
          style={{ fontSize: 20, width:20, padding: 4, marginTop: 70, borderRadius: 20, backgroundColor: "white" }}
          leftIcon={<FontAwesome name="search" size={24} color="black" style={{ marginTop: 10,position:'absolute',top:30}} />}
          defaultValue={titleRef.current}
          placeholder="Find your manga here"
          onChangeText={(text) => {
            titleRef.current = text;
            captureText();
          }}

        />

      </View>
      <Text style={{ color: "white" }}>GameList</Text>
      <FlatList
        data={games}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(game) => String(game._id)}
        renderItem={({ item }) => <GamesCard games={item} />}
        contentContainerStyle={styles.flatListContainer}>

      </FlatList>
    </ScrollView>
  )
}
export default GameList

const styles = StyleSheet.create({
  flatListContainer: {
    backgroundColor: "#000000",
    paddingHorizontal: 5,
  }
}) 