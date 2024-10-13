// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyJnWJzZIoWk1_RrrYqFLfZEMGFjYrVGk",
  authDomain: "my-articles-e65f8.firebaseapp.com",
  projectId: "my-articles-e65f8",
  storageBucket: "my-articles-e65f8.appspot.com",
  messagingSenderId: "435462388661",
  appId: "1:435462388661:web:9168e2c541a7fd505237fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);