import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZ16YhQzmkaeXbSNlF-Mqhdy-E4u1JCQg",
  authDomain: "clone-9b8f2.firebaseapp.com",
  projectId: "clone-9b8f2",
  storageBucket: "clone-9b8f2.firebasestorage.app",
  messagingSenderId: "403450651381",
  appId: "1:403450651381:web:6f42ebbf3e5a53f41f9bbc",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();