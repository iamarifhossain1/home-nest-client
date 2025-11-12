// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVtvFIpp54LYrrD7TeDEuyHqcF_nEVc1k",
  authDomain: "home-nest-8bed7.firebaseapp.com",
  projectId: "home-nest-8bed7",
  storageBucket: "home-nest-8bed7.firebasestorage.app",
  messagingSenderId: "283121405879",
  appId: "1:283121405879:web:82484656ce72b60a60a232"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);