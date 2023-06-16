import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Alert, SafeAreaView, Image,ScrollView } from 'react-native';
import { Text, Input, Icon } from '@rneui/themed';
import axios from 'axios';
import Modal from 'react-native-modal';
import GameList from '../components/GameList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import { getGamesApi } from '../api/games';
import signIn from '../../assets/dios.jpg'
import registerfondo from '../../assets/imagen-gamer2.jpg'
import icono from '../../assets/icono1.png'
import luis from '../../assets/luis.png'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState, useRef } from "react";
import profilefondo from '../../assets/fondoprofile.jpg'





export default function Home() {

  const { login, logout, auth } = useAuth()

  console.log(auth);

  const [isLoginView, setIsLoginView] = React.useState(true);
  const image = { uri: 'https://www.xtrafondos.com/descargar.php?id=5703&resolucion=3840x2158' };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [photo, setPhoto] = React.useState('');


  const [isAlertVisible, setIsAlertVisible] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  let token
  const [games, setGames] = React.useState([]);



  const PurpleButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderWidth: 1,
          borderColor: '#3C4B5B',
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
          alignItems: 'center',
          backgroundColor: '#3C4B5B',
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
      login(res.data.user)

      if (res.data.user) {
        token = res.data.token
        await AsyncStorage.setItem('token', token);


        let headers = { headers: { Authorization: `Bearer ${token}` } };
        getGamesApi(headers, setGames)

        console.log(res.data.user.email);

        if (!isLoggedIn) {
          setIsLoggedIn(true)
          Alert.alert('Hello', `${res.data.user.email}`)
          console.log(res.data.message);

        }

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
  const navigation = useNavigation()



  const handleRegister = async (e) => {

    e.preventDefault();
    if (!email || !password || !name || !photo) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    let data = {
      email: email.toLocaleLowerCase(),
      password: password
    }

    let dataUser = {
      name: name,
      email: email.toLocaleLowerCase(),
      photo: photo.toLocaleLowerCase(),
      password: password,
    };

    try {
      const res = await axios.post(
        'https://game-zone-back.onrender.com/auth/register',
        dataUser
      )
      console.log(res.data)
      if (res.data.user) {

        const res = await axios.post(
          'https://game-zone-back.onrender.com/auth/signin',
          data
        );

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

          register(true);
          Alert.alert('signed in ', `${res.data.user.email}`);
        }
      }
    } catch (error) {
      console.log(error.response);

    }
    setIsLoginView(true)
    console.log(dataUser);
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView); // Cambiar entre LogIn y Register
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  const [showProfileSection, setShowProfileSection] = useState(false);
  const [profile1, setProfile1] = useState(false);

  let abrirprofile = () => {
    setProfile1(prevSet => !prevSet)
  }

  let profileButton = () => {
    setShowProfileSection(true);

  };
  const handleLogout = async () => {
    try {
      // Eliminar el token de autenticación almacenado en AsyncStorage
      await AsyncStorage.removeItem('token');

      // Restablecer cualquier estado necesario
      setIsLoggedIn(false);
      // Otros estados o acciones que deban restablecerse al cerrar sesión

      // Mostrar una alerta de éxito
      Alert.alert('Logged Out', 'You have been successfully logged out.');
    } catch (error) {
      console.error('Error logging out:', error);
      // Mostrar una alerta de error si ocurre algún problema al cerrar sesión
      Alert.alert('Error', 'An error occurred while logging out. Please try again.');
    }
  };

  // ...

  <TouchableOpacity onPress={handleLogout}>
    <Text>Logout</Text>
  </TouchableOpacity>

  return (
    <>
      {!isLoggedIn ? (
        <>
          <ImageBackground
            source={isLoginView ? signIn : registerfondo}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}

          >
            <View
              h1
              style={{
                flex: 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                color: 'blue',
                backgroundColor: '#000000CC',


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
                  marginBottom: 10,
                }}
              >
                {isLoginView ? 'WELCOME' : 'GAME ZONE'}
              </Text>
              {!isLoginView && (
                <Input
                  style={{
                    borderWidth: 4,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    paddingHorizontal: 4,
                    width: '80%',
                    height: 20,
                    paddingTop: 5,
                    paddingBottom: 8,
                    borderRadius: 8,
                    fontSize: 18,
                    backgroundColor: '#3C4B5B',
                    color: 'white',
                  }}
                  placeholder="Name"
                  rightIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                  value={name}
                  onChangeText={setName}
                />
              )}
              <Input
                autoCapitalize="words"
                style={{
                  borderWidth: 4,
                  borderColor: 'rgba(0, 0, 0, 0)',
                  paddingHorizontal: 4,
                  width: '80%',
                  height: 20,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 8,
                  fontSize: 18,
                  backgroundColor: '#3C4B5B',
                  color: 'white',
                }}
                placeholder="Email"
                rightIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
                value={email}
                onChangeText={setEmail}
              />

              {!isLoginView && (
                <Input
                  style={{
                    borderWidth: 4,
                    borderColor: 'rgba(0, 0, 0, 0)',
                    paddingHorizontal: 4,
                    width: '80%',
                    height: 20,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 8,
                    fontSize: 18,
                    backgroundColor: '#3C4B5B',
                    color: 'white',
                  }}
                  placeholder="Photo"
                  rightIcon={{ type: 'font-awesome', name: 'image', color: 'white' }}
                  value={photo}
                  onChangeText={setPhoto}
                />
              )}

              <Input
                secureTextEntry={true}
                style={{
                  borderWidth: 4,
                  borderColor: 'rgba(0, 0, 0, 0)',
                  paddingHorizontal: 4,
                  width: '80%',
                  height: 30,
                  paddingTop: 8,
                  paddingBottom: 8,
                  borderRadius: 8,
                  fontSize: 18,
                  backgroundColor: '#3C4B5B',
                  color: 'white',
                }}
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

                      <Text style={[styles.textHover,{color: 'slategray',fontWeight: 'bold',fontSize: 18,}]}>Register</Text>
                    </>
                  )}
                  {!isLoginView && (
                    <>
                      <Text style={{ color: 'white' }}>Already have an account? </Text>
                      <Text style={{
                        color: 'slategray',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>Log In</Text>
                    </>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>

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
        </>
      ) : (
        <>
          <SafeAreaView style={styles.container}>

            <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderColor: 'grey', backgroundColor: '#343434' }}>
              <Image source={luis} style={{ width: 60, height: 60 }}></Image>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity onPress={() => {
                  profileButton()
                  abrirprofile()
                }}>
                  <Image
                    source={icono}
                    style={{ width: 40, height: 40 }}>
                  </Image>
                </TouchableOpacity>
              </View>
            </View>
            {showProfileSection ? (
              <ImageBackground source={profilefondo} style={{
                flex: 1,
                width: '100%'
              }}>
               
                <View style={{ width: '100%', alignItems: 'center', height: 400, justifyContent: 'space-around', height: '100%', display: 'flex' }}>

                  {!profile1 &&
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', alignItems: 'center', position: 'relative', bottom: 65, backgroundColor: '#000000CC', height: 150 }}>
                      <Image style={{ width: 100, height: 100, borderRadius: 20 }} source={{ uri: auth.photo }}></Image>
                      <View style={{ width: '70%', display: 'flex', justifyContent: 'space-around', height: '100%', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'white', borderRadius: 12, padding: 20, width: '70%', height: 5, textAlign: 'center', marginBottom: 5 }}>{auth.email}</Text>
                        <TouchableOpacity
                          onPress={() => {
                            setIsLoggedIn(false)
                            handleLogout()
                            Alert.alert('Logged Out', 'You have been successfully logged out.')
                          }}
                          style={styles.logoutButton}>
                          <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                      </View>
       
                    </View>}
                  {/*   <ImageBackground  style={{width:'100%',height:100}}></ImageBackground> */}
                  <View style={{ marginTop: 5, alignItems: 'center', width: '100%', backgroundColor: '#000000CC', borderRadius: 50, padding: 10 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>GO TO THE GAME SESSION </Text>
                    <TouchableOpacity onPress={() => setShowProfileSection(false)} style={{
                      width: '50%',
                      backgroundColor: '#155E75',
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: 10,
                      borderRadius: 10,
                    }}>
                      <Text style={{ color: 'white', fontSize: 20, paddingVertical: 10 }}> Games</Text>
                    </TouchableOpacity>
                  </View>


                </View>
                <View style={{width:'100%',height:100,backgroundColor:'white'}}> 
<Text>holaaaaaaaaaaa</Text>
                </View>
            
              </ImageBackground>
              ) : (<GameList games={games} />)}


          </SafeAreaView>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%'

  },
  text: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#3C4B5B',
    padding: 15,
    borderRadius: 10,
    height: 50,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'

  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  textHover: {
    color: 'cyan',
  },
  socialTextContainer: {
    marginRight: 12,
  },
  socialText: {
    color: 'white',
    fontWeight: 'bold',
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginRight: 6,
    color: 'white',
    fontSize: 24,
  },
});
