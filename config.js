import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


export const firebaseConfig = {
    apiKey: "AIzaSyDSuE1iVLkNYltaQClbQpLvnlDKc5nDbHI",
    authDomain: "react-otp-b0b6c.firebaseapp.com",
    projectId: "react-otp-b0b6c",
    storageBucket: "react-otp-b0b6c.appspot.com",
    messagingSenderId: "879182337149",
    appId: "1:879182337149:web:604ad42868b80c19a64d14",
    measurementId: "G-T7EW0FVSHZ"
  };


  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }