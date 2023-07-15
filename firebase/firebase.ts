import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1u1DUtYs6rNKsSfgHm4t7sTsKkvlQ17s",
  authDomain: "chatgpt-clone-c7d93.firebaseapp.com",
  projectId: "chatgpt-clone-c7d93",
  storageBucket: "chatgpt-clone-c7d93.appspot.com",
  messagingSenderId: "120741809288",
  appId: "1:120741809288:web:11c6d15b91c6ce8d4ca33d",
  measurementId: "G-E9BZ8BVNPL",
};

// Initialize Firebase
const app = getApps().length ? getApp : initializeApp(firebaseConfig);
const db = getFirestore(app as FirebaseApp);

export { db };
