import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
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

  const [user,setUser] = useState("")
  const [pass,setPass] = useState("")

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
  }, []);

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
    Alert.alert(usersList.toString)
    Alert.alert(user,pass)

    if (isAuth(user, pass)) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SIGN IN</Text>

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

      <Text style={styles.textCenter}>
        Not a member? <Text onPress={() => navigation.navigate('SignUp')}>Register</Text>
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 18,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  sendVerification: {
    padding: 20,
    backgroundColor: '#3498db',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textCenter: {
    textAlign: 'center',
    marginTop: 20,
  },
});
