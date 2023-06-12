import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

export default function GamesCard(props) {
  const {games} = props
  
  const gameDetails = () => {
    console.log(`Go to game: ${games.title}`)
  }

  return (
    <TouchableWithoutFeedback onPress={gameDetails} style={styles.touchable}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bgStyles}>
            <View style={{width:"60%", paddingHorizontal:20, justifyContent:"space-between"}}>
              <Text style={{color:"white", fontWeight:"bold", fontSize:15 }}>{games.title}</Text>
              <Text style={{color:"blue"}}>{games.company_id.name.toUpperCase()}</Text>
              <View>
                <Text style={{fontWeight:"bold", }}>Price</Text>
                <Text style={{color:"white", fontWeight:"bold", fontSize:25}}>${games.price}</Text>
              </View>
            </View>
            <Image
              source={{uri: `${games.cover_photo}`}}
              style={{width: "40%", height:250}}>
            </Image>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  touchable:{
    flex:1,
    flexDirection:"row"
  },
  card:{
    width: "100%",
  
  },
  spacing:{
    padding:10,
  },
  bgStyles:{
    flex:1,
    flexDirection:"row-reverse",
    backgroundColor:"gray",
    padding: 15
  }
}) 