import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyADpTL7X7--v5pY5bXQ6fBTkFaYmIMRc_A",
    authDomain: "watchable-b5122.firebaseapp.com",
    projectId: "watchable-b5122",
    storageBucket: "watchable-b5122.appspot.com",
    messagingSenderId: "631428649845",
    appId: "1:631428649845:web:e16f4bfa00582d3b0c393c",
    measurementId: "G-YGKE9YCVXT"
};
const firebaseApp = firebase.initializeApp(config);

// Initialize the Firestore database
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
export default firebaseApp;
