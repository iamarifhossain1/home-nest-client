// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCWqd97gMQKxWbss9UU9xqNzxVLP3PoFE",
  authDomain: "home-nest-4d06c.firebaseapp.com",
  projectId: "home-nest-4d06c",
  storageBucket: "home-nest-4d06c.firebasestorage.app",
  messagingSenderId: "200901386018",
  appId: "1:200901386018:web:e827c8d53468705b9f0f7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);