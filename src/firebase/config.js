/** @format */

import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA9gzNft0SmshKPv3LdgrCKyaA9LNoZsH4",
  authDomain: "chatapp-5c2b7.firebaseapp.com",
  projectId: "chatapp-5c2b7",
  storageBucket: "chatapp-5c2b7.appspot.com",
  messagingSenderId: "774874534735",
  appId: "1:774874534735:web:cd087b6111bd4c1ee6eb3a",
  measurementId: "G-CQX3RX44LG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator("http://localhost:9099");
// db.useEmulator("localhost", "8080");

export { auth, db };
export default firebase;
