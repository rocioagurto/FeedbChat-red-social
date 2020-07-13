import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD0lpJSacUg4CP9duVTHUR7plbRGuz3q8U",
    authDomain: "red-social-396f9.firebaseapp.com",
    databaseURL: "https://red-social-396f9.firebaseio.com",
    projectId: "red-social-396f9",
    storageBucket: "red-social-396f9.appspot.com",
    messagingSenderId: "110714558239",
    appId: "1:110714558239:web:56ed101aac8bb91b9d022a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

  export {firebase, db, auth, storage}