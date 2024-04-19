// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnXfTWLUpuo8Mx1Zmf6HBtjtw6WdxVJD0",
  authDomain: "imsystem-78316.firebaseapp.com",
  projectId: "imsystem-78316",
  storageBucket: "imsystem-78316.appspot.com",
  messagingSenderId: "34898322585",
  appId: "1:34898322585:web:52d157cd46d5faa4410408"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;