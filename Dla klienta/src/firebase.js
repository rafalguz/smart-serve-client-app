// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfiguracja Firebase z projektu "App Szajnochy 11"
const firebaseConfig = {
  apiKey: "AIzaSyC7VBhrmjNAeLX2Rrgx4dzURLzv7D02K2I",
  authDomain: "app-szajnochy-11.firebaseapp.com",
  projectId: "app-szajnochy-11",
  storageBucket: "app-szajnochy-11.firebasestorage.app",
  messagingSenderId: "357614366854",
  appId: "1:357614366854:web:17bd8b03fe411d0855e107"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Eksport Firestore
export const db = getFirestore(app);
