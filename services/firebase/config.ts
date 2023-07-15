'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATXUk8_HTw6gVnQiOdk-agcQ6AkXshDW4",
  authDomain: "nextjs-chat-app-b7eb9.firebaseapp.com",
  projectId: "nextjs-chat-app-b7eb9",
  storageBucket: "nextjs-chat-app-b7eb9.appspot.com",
  messagingSenderId: "628595481613",
  appId: "1:628595481613:web:5444c4398de72d608a0944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);
