// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJHegA49GZEMYoUmGXzE0xxG3kWLUF2Ps",
  authDomain: "house-marketplace-app-87e36.firebaseapp.com",
  projectId: "house-marketplace-app-87e36",
  storageBucket: "house-marketplace-app-87e36.appspot.com",
  messagingSenderId: "217193169897",
  appId: "1:217193169897:web:5b4e4c70fbd3a7c7290178"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()