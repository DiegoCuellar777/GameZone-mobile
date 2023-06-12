import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Tab, Text, TabView, Input, Icon } from '@rneui/themed';
import axios from 'axios';
import Modal from 'react-native-modal';
import GameList from './src/components/GameList';
import { TabBarIOS } from 'react-native';

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [isLoginView, setIsLoginView] = React.useState(true);
  const image = { uri: 'https://wallpaperaccess.com/full/982096.jpg' };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [photo, setPhoto] = React.useState('');

  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  let token
  const [games, setGames] = React.useState([]);

  
  useEffect(() => {
    console.log(games);
  }, [games]);


  const PurpleButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginTop: 30,
          marginBottom: 30,
          backgroundColor: '#0174DF',
          padding: '2%',
          borderRadius: '20px',
          width: '80%',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 15 }}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    let dataUser = {
      email: email.toLocaleLowerCase(),
      password: password,
    };

    try {
      const res = await axios.post(
        'https://game-zone-back.onrender.com/auth/signin',
        dataUser
      );
      console.log(res.data);

      if (res.data.user) {
        token = res.data.token 
        console.log(token)

        let headers = { headers: { Authorization: `Bearer ${token}` } };
      axios.get('https://game-zone-back.onrender.com/games/all', headers)
        .then((res) => {
          console.log(res.data.Game)
          setGames(res.data.Game)
          console.log(games);
        })
        .catch((err) => console.log(err))

        setIsLoggedIn(true);
        Alert.alert('Welcome', `Hello ${res.data.user.email}`);
      } else {
        Alert.alert('Error', 'Invalid email or password');
      }
    } catch (err) {
      console.log(err.response.data.message);

      if (err.response && err.response.data && err.response.data.message) {
        setAlertMessage(err.response.data.message);
      } else {
        setAlertMessage('An error occurred. Please try again.');
      }

      setIsAlertVisible(true);
    }

   
  };


  const handleRegister = (e) => {
    e.preventDefault();

    let dataUser = {
      name: name,
      email: email.toLocaleLowerCase(),
      photo: photo.toLocaleLowerCase(),
      password: password,
    };

    console.log(dataUser);
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView); // Cambiar entre LogIn y Register
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
    {!isLoggedIn ? (
      <>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <View
                h1
                style={{
                  flex: 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'blue',
                  backgroundColor: '#00000095',
                  height: '80%',
                  width: '80%',
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    textAlign: 'center',
                    marginBottom: 30,
                  }}
                >
                  Level up your gaming experience! Shop now and unleash the fun!
                </Text>
                {!isLoginView && (
                  <Input
                    style={{ color: 'white', fontSize: 10 }}
                    placeholder="Name"
                    rightIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                    value={name}
                    onChangeText={setName}
                  />
                )}
                <Input
                  autoCapitalize="words"
                  style={{ color: 'white', fontSize: 10 }}
                  placeholder="Email"
                  rightIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
                  value={email}
                  onChangeText={setEmail}
                />

                {!isLoginView && (
                  <Input
                    style={{ color: 'white', fontSize: 10 }}
                    placeholder="Photo"
                    rightIcon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                    value={photo}
                    onChangeText={setPhoto}
                  />
                )}

                <Input
                  secureTextEntry={true}
                  style={{ color: 'white', fontSize: 10 }}
                  placeholder="Password"
                  rightIcon={
                    <Icon style={{ color: 'white' }} name="lock" size={24} color="white" />
                  }
                  value={password}
                  onChangeText={setPassword}
                />
                <PurpleButton
                  onPress={isLoginView ? handleLogin : handleRegister}
                  title={isLoginView ? 'Sign In' : 'Register'}
                />
                <TouchableOpacity onPress={toggleView}>
                  <Text style={{ color: 'white', marginTop: 10, textAlign: 'center' }}>
                    {isLoginView && (
                      <>
                        <Text style={{ color: 'white' }}>Don't have an account? </Text>
                        <Text style={{ color: 'blue' }}>Register</Text>
                      </>
                    )}
                    {!isLoginView && (
                      <>
                        <Text style={{ color: 'white' }}>Already have an account? </Text>
                        <Text style={{ color: 'blue' }}>Log In</Text>
                      </>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TabView.Item>

          <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
            <Text h1>Favorite</Text>
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
            <Text h1>Cart</Text>
          </TabView.Item>
        </TabView>

        <Modal
          isVisible={isAlertVisible}
          onBackdropPress={hideAlert}
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              width: '50%',
              backgroundColor: 'black',
              padding: 20,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              {alertMessage}
            </Text>
            <TouchableOpacity onPress={hideAlert} style={{ backgroundColor: 'blue', padding: 10 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Home"
          titleStyle={{ fontSize: 10 }}
          icon={{ name: 'home', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Favorites"
          titleStyle={{ fontSize: 10 }}
          icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Cart"
          titleStyle={{ fontSize: 10 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      </>
    ) : (
        <>
          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={styles.container}>
              <ScrollView>
               <GameList games={games}/>
                <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </ScrollView>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
              <Text h1>Favorite</Text>
            </TabView.Item>
            <TabView.Item style={{ backgroundColor: 'black', width: '100%' }}>
              <Text h1>Cart</Text>
            </TabView.Item>
          </TabView>
        
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: 'white',
              height: 3,
            }}
            variant="primary"
          >
            <Tab.Item
              title="Home"
              titleStyle={{ fontSize: 10 }}
              icon={{ name: 'home', type: 'ionicon', color: 'white' }}
            />
            <Tab.Item
              title="Favorites"
              titleStyle={{ fontSize: 10 }}
              icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
            />
            <Tab.Item
              title="Cart"
              titleStyle={{ fontSize: 10 }}
              icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
            />
          </Tab>
        </>
    )}
  </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});
