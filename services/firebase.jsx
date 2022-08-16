// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMHB7LQFIzz4boHO3clvKQY2OX8MNWKtk",
    authDomain: "crud-simples-d6cea.firebaseapp.com",
    projectId: "crud-simples-d6cea",
    storageBucket: "crud-simples-d6cea.appspot.com",
    messagingSenderId: "305928855736",
    appId: "1:305928855736:web:8045d48501f335d9f0144d"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)