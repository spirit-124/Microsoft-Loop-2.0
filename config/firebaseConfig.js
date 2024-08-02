// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "loop2-a1747.firebaseapp.com",
  projectId: "loop2-a1747",
  storageBucket: "loop2-a1747.appspot.com",
  messagingSenderId: "451444344063",
  appId: "1:451444344063:web:c8af3446282932be6438ca",
  measurementId: "G-TVNPSCFZPR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
