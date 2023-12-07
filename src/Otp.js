import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from '../config';
import { useNavigation } from '@react-navigation/native';

const Otp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phno, setPhno] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [verfyID, setVerifyID] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();

    phoneProvider.verifyPhoneNumber(
      `${countryCode}${phno}`,
      recaptchaVerifier.current
    ).then(setVerifyID);
    setPhno('');
    setModalVisible(true);
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verfyID,
      otp
    );
    firebase.auth().signInWithCredential(credential).then(() => {
      setOtp('');
      setModalVisible(false);
      Alert.alert('Login Successfully');
      navigation.navigate('Home');
    }).catch((err) => {
      alert(err);
      setModalVisible(false);
      Alert.alert('OTP Mismatch');
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>Sign Up</Text>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

      {/* ... (TextInputs, Buttons, Modal, etc.) */}

    </View>
  );
};

export default Otp;


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
  sendCode: {
    padding: 20,
    backgroundColor: '#9b59b6',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

