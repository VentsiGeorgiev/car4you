import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIzqloZgOAE9Ky6E_AoPEpe30qkbX6N1w",
  authDomain: "car4you-cc2ad.firebaseapp.com",
  projectId: "car4you-cc2ad",
  storageBucket: "car4you-cc2ad.appspot.com",
  messagingSenderId: "1000330809614",
  appId: "1:1000330809614:web:3b38d0c21c8f1f7ed5875f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();