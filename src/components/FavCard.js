import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Favorite from './Favorite'



export default function FavCard(props) {

  const { favs } = props

  const navigation = useNavigation()

  const gameDetails = () => {
    navigation.navigate("Details", { title: favs.title, photo: favs.cover_photo, description: favs.description, company: favs?.company_id?.name })
  }

  return (
    <>
     
      <TouchableWithoutFeedback onPress={gameDetails} style={styles.touchable}>
      
        <View style={styles.card}>
          <View style={styles.spacing}>
            <View style={styles.bgStyles}>
              <View style={{ width: "65%", paddingLeft: 20, justifyContent: "space-between" }}>
                <View style={{ width: "100%", flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>{favs?.title}</Text>
                </View>
                <Text style={{ color: "#c6cbcf", fontWeight: "bold", fontSize: 16 }}>{favs?.company_id?.name?.toUpperCase()}</Text>
                <View>
                  <Text style={{ fontWeight: "bold", color: "grey" }}>Price</Text>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>${favs?.price}</Text>
                </View>
              </View>
              <Image
                source={{ uri: `${favs?.cover_photo}` }}
                style={{ width: "35%", height: 200 }}>
              </Image>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: "row"
  },
  card: {
    width: "100%",

  },
  spacing: {
    padding: 10,
  },
  bgStyles: {
    flex: 1,
    flexDirection: "row-reverse",
    backgroundColor: "#2488ed30",
    padding: 15
  }
}) 