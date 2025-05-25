import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
  // NOTE: Replace these placeholder values with your actual Firebase config
  apiKey: "AIzaSyAd43aI4jKJs9UP-LEh9vfoWe8GRUiaZJM",
  authDomain: "nred-96d01.firebaseapp.com",
  databaseURL: "https://nred-96d01-default-rtdb.firebaseio.com",
  projectId: "nred-96d01",
  storageBucket: "nred-96d01.firebasestorage.app",
  messagingSenderId: "708668765130",
  appId: "1:708668765130:web:67517fc2807f0f3a2a9533"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export default app; 