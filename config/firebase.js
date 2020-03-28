import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDueQMAfwUvjrvk6Bbbip2zj8u_KOq4ReI",
  authDomain: "finspirehackathon.firebaseapp.com",
  databaseURL: "https://finspirehackathon.firebaseio.com",
  projectId: "finspirehackathon",
  storageBucket: "finspirehackathon.appspot.com",
  messagingSenderId: "593603447664",
  appId: "1:593603447664:web:800205724fc1c6d035ddb5",
  measurementId: "G-7VTS6M2D2H"
};

firebase.initializeApp(firebaseConfig)

export default firebase