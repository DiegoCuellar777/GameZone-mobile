import { ScrollView, Text, Image, View, StyleSheet } from 'react-native';
import React from 'react';



export default function Details(props) {
  const { route, navigation } = props;
  console.log(route);
  return (
    <ScrollView style={{ backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Image
          source={{ uri: `${route.params.photo}` }}
          style={{ width: '100%', height: 370, marginBottom: 30 }}
          resizeMode="cover"
        />
        <Text style={styles.title}>{route.params.title}</Text>
        <View style={styles.textContainer}>
          <Text style={styles.companyText}>{route.params.company}</Text>
        </View>
        <Text style={styles.description}>{route.params.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 30,
  },
  textContainer: {
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  companyText: {
    color: '#0174DF',
    fontSize: 24,
    paddingBottom:30
  },
  description: {
    color: 'white',
    fontSize: 18,
    padding: 30,
  },
});
