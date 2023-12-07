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
  ScrollView,
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
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const recaptchaVerifier = useRef(null);

  const sendVerification = () => {
    // Your form validation logic here
    if (name && email && phno && aadharNumber && password && confirmPassword) {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();

      phoneProvider.verifyPhoneNumber(
        `${countryCode}${phno}`,
        recaptchaVerifier.current
      ).then(setVerifyID);
      setPhno('');
      setShowOtpVerification(true);
    } else {
      Alert.alert('Please fill in all fields before sending verification.');
    }
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verfyID,
      otp
    );
    firebase.auth().signInWithCredential(credential).then(() => {
      setOtp('');
      setShowOtpVerification(false);
      Alert.alert('Login Successfully');
      navigation.navigate('Home');
    }).catch((err) => {
      alert(err);
      setShowOtpVerification(false);
      Alert.alert('OTP Mismatch');
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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

        <TextInput
          placeholder="Name"
          onChangeText={setName}
          style={styles.textInput}
        />

        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Phone Number"
          onChangeText={setPhno}
          keyboardType="phone-pad"
          autoComplete="tel"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Aadhar Number"
          onChangeText={setAadharNumber}
          keyboardType="numeric"
          style={styles.textInput}
        />

        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
        />

        <TextInput
          placeholder="Reconfirm Password"
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.textInput}
        />

        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>

        {showOtpVerification ? (
          <View>
            <Text style={styles.modalHeaderText}>Enter OTP</Text>
            <TextInput
              placeholder="Enter OTP"
              onChangeText={setOtp}
              keyboardType="number-pad"
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.sendCode}
              onPress={confirmCode}
            >
              <Text style={styles.buttonText}>Confirm Verification</Text>
            </TouchableOpacity>
          </View>
        ):<View></View>}
      </View>
    </ScrollView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
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
    borderRadius: 50,
    marginTop: 20,
  },
});
