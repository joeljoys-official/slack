import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBO13A47bjz3qBXxj8SWz7dKtM3IFwcZTI",
  authDomain: "slack-clone-b7b02.firebaseapp.com",
  databaseURL: "https://slack-clone-b7b02.firebaseio.com",
  projectId: "slack-clone-b7b02",
  storageBucket: "slack-clone-b7b02.appspot.com",
  messagingSenderId: "412688753507",
  appId: "1:412688753507:web:636729ace10ad6474c2956",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
