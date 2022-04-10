// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu1kdEKPqTfL1XIjDF2l8rfG53FcdtVSM",
  authDomain: "capstone-i4.firebaseapp.com",
  projectId: "capstone-i4",
  storageBucket: "capstone-i4.appspot.com",
  messagingSenderId: "768427043765",
  appId: "1:768427043765:web:6643185734fe346ddd07fc",
  measurementId: "G-X8E63KZMT3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const storage = getStorage(app);
export const db = getFirestore(app);