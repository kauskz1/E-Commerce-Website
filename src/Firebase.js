/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDO6VFoD6PTn1DnAbT1RYH4C6f63rvpm84",
  authDomain: "cart-9b830.firebaseapp.com",
  projectId: "cart-9b830",
  storageBucket: "cart-9b830.appspot.com",
  messagingSenderId: "54935127261",
  appId: "1:54935127261:web:66779b2b6c969e8c3a8734",
  measurementId: "G-M0VYZVM3FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth();

export {db,auth};