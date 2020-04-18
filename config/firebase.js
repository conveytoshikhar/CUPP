import firebase from "firebase"
import "firebase/firestore"
import "firebase/auth"

  var firebaseConfig = {
    apiKey: "AIzaSyDIHK7Di5r7vmB9XLLViI9m-7wLrDl6NYI",
    authDomain: "cupp-app.firebaseapp.com",
    databaseURL: "https://cupp-app.firebaseio.com",
    projectId: "cupp-app",
  storageBucket: "cupp-app.appspot.com",
    messagingSenderId: "657173683832",
    appId: "1:657173683832:web:8c4d997b4807c6aef2578d"
  };

firebase.initializeApp(firebaseConfig)

export default firebase