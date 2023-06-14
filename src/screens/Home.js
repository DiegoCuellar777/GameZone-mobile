import React from 'react';
import { ImageBackground, StyleSheet, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Text, Input, Icon } from '@rneui/themed';
import axios from 'axios';
import Modal from 'react-native-modal';
import GameList from '../components/GameList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import { getGamesApi } from '../api/games';


export default function Home() {

  const {login, logout, auth} = useAuth()

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
          marginTop: 30,
          marginBottom: 30,
          backgroundColor: '#0174DF',
          padding: '2%',
          borderRadius: 20,
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
      login(res.data.user)

      if (res.data.user) {
        token = res.data.token 
        await AsyncStorage.setItem('token', token);
        

        let headers = { headers: { Authorization: `Bearer ${token}` } };
        getGamesApi(headers, setGames)

        console.log(res.data.user.email);
        
        if (!isLoggedIn) {
        setIsLoggedIn(true)
        
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


  const handleRegister =async (e) => {

    e.preventDefault();
    if (!email || !password||!name||!photo) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    let data= {
      email:email.toLocaleLowerCase(),
      password:password
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
        Alert.alert('signed in ',`${res.data.user.email}`);
      }}
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

  return (
    <>
    {!isLoggedIn ? (
      <>
      <ImageBackground
              source={image}
              resizeMode="cover"
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
              
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
                <GameList games={games}/>
                <TouchableOpacity
                  onPress={() => {
                    setIsLoggedIn(false)
                    logout()
                  }}
                  style={styles.logoutButton}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
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
    borderRadius:50
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
