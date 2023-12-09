import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../Context';

const SignIn = () => {
  const {
    Gemail,
    setGEmail,
    Gpassword,
    setGPassword,
    Gname,
    setGName,
    Gphno,
    setGPhno,
    GaadharNumber,
    setGAadharNumber,
  } = AppContext();
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get('https://projectgg-server.onrender.com/users');
      console.log(response.data);
      setUsersList(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [usersList]);

  const isAuth = (user, pass) => {
    var r = 0;

    if (usersList.length) {
      usersList.map((item) => {
        if (item.email === user && item.password === pass) {
          console.log(item.username);
          setGName(item.username);
          setGPhno(item.phno);
          setGAadharNumber(item.aadharNumber);
          r = 1;
        } else if (item.email === user && item.password !== pass) {
          r = 2;
        }
      });
    }

    if (r === 1) {
      Alert.alert('Login Success');
      setGEmail(user);
      setGPassword(pass);
      return true;
    } else if (r === 2) {
      Alert.alert('Incorrect Password');
      return false;
    } else {
      Alert.alert('Invalid Username/Password');
      return false;
    }
  };

  const handleSubmit = () => {
    if (isAuth(user, pass)) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>LOG IN</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            onChangeText={setUser}
            style={styles.textInput}
          />

          <TextInput
            placeholder="Password"
            onChangeText={setPass}
            secureTextEntry
            style={styles.textInput}
          />

          <TouchableOpacity
            style={styles.sendVerification}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
    },
    backgroundImage: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
    },
    icon: {
      width: 100,
      height: 100,
      marginBottom: 20,
      borderRadius: 50,
      marginTop: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
      marginBottom: 20,
    },
    inputContainer: {
      width: 300,
      marginBottom: 15,
    },
    textInput: {
      width: 300,
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 20,
      fontSize: 18,
      borderColor: "rgba(0, 0, 0, 0.1)",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 15,
    //   textAlign: "center",
      color: "black",
    },
    sendVerification: {
      width: 300,
      padding: 20,
      backgroundColor: "#3498db",
      borderRadius: 10,
      marginBottom: 20,
    },
    sendCode: {
      width: 300,
      padding: 20,
      backgroundColor: "#9b59b6",
      borderRadius: 10,
    },
    buttonText: {
      textAlign: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
    },
    modalHeaderText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
      marginBottom: 20,
    },
  });
  
