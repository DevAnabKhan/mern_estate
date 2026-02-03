// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-d9b61.firebaseapp.com",
  projectId: "mern-estate-d9b61",
  storageBucket: "mern-estate-d9b61.firebasestorage.app",
  messagingSenderId: "199866934374",
  appId: "1:199866934374:web:fd6bc277f0df53513979a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
