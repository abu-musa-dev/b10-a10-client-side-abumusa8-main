// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Firebase Authentication
import { getDatabase } from "firebase/database"; // Firebase Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcoUaOzNSKFlz1_v3SnahBfh2CxLbeb1U",
  authDomain: "dreem-found.firebaseapp.com",
  projectId: "dreem-found",
  storageBucket: "dreem-found.firebasestorage.app",
  messagingSenderId: "730400320868",
  appId: "1:730400320868:web:2c6f0e6856116a07bb1e71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

// Export the auth and database instances to use in other parts of the app
export { auth, database };
