// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// import {}
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "devblogauth.firebaseapp.com",
  projectId: "devblogauth",
  storageBucket: "devblogauth.firebasestorage.app",
  messagingSenderId: "538735963803",
  appId: "1:538735963803:web:7032871e96f1e843f8203e",
  measurementId: "G-C50D441NGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
