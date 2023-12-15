import React, { useContext, useRef, useState } from "react";
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
  ImageBackground,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../config";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AppContext } from "../Context";

const Otp = () => {
  const { Gname } = AppContext();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phno, setPhno] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [verfyID, setVerifyID] = useState(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const recaptchaVerifier = useRef(null);

  const sendVerification = async () => {
    if (name && email && phno && aadharNumber && password && confirmPassword) {
      try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(
          `${countryCode}${phno}`,
          recaptchaVerifier.current
        );

        setVerifyID(verificationId);
        setShowOtpVerification(true);
      } catch (error) {
        console.error("Error sending verification code:", error);
        Alert.alert("Error sending verification code. Please try again.");
      }
    } else {
      Alert.alert("Please fill in all fields before sending verification.");
    }
  };

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verfyID,
        otp
      );

      // Try to sign in with the provided OTP
      await firebase.auth().signInWithCredential(credential);
      setOtp("");
      setShowOtpVerification(false);

      // If sign in is successful, make the API call
      const response = await axios.post("https://projectgg-server.onrender.com/signup", {
        name,
        email,
        phno,
        aadharNumber,
        password,
        isAdmin,
      });

      console.log("User signed up successfully:", response.data);

      // If the API call is successful, navigate to the 'Home' screen
      navigation.navigate("LOG IN");
    } catch (err) {
      console.error("Error confirming OTP or making API call:", err);
      setShowOtpVerification(false);
      Alert.alert("OTP Mismatch or API call failed. Please try again.");
    }
  };

  return (
    
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
   <ImageBackground
    source={require("./BG.jpeg")} // Replace with your image source
    style={styles.backgroundImage}
    resizeMode="cover"
  >
        <View style={styles.container}>
          <Image
            source={require("./icon.png")}
            style={styles.icon}
            resizeMode="contain"
          />
         

          <Text style={styles.headerText}>{Gname} Sign Up</Text>

          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              onChangeText={setName}
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Phone Number"
              onChangeText={setPhno}
              keyboardType="phone-pad"
              autoComplete="tel"
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Aadhar Number"
              onChangeText={setAadharNumber}
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              onChangeText={setPassword}
              secureTextEntry
              style={styles.textInput}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Reconfirm Password"
              onChangeText={setConfirmPassword}
              secureTextEntry
              style={styles.textInput}
            />
          </View>

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
              <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text style={styles.buttonText}>Confirm Verification</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        </ImageBackground>
    </ScrollView>
      
  );
};

export default Otp;

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
    width: "100%",
    marginBottom: 15,
    alignItems:'center'
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
