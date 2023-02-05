// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzwQDRjLWBJgyBTrrAdAfVc3GdmlgNWyQ',
  authDomain: 'fbcopy-89ea8.firebaseapp.com',
  projectId: 'fbcopy-89ea8',
  storageBucket: 'fbcopy-89ea8.appspot.com',
  messagingSenderId: '988779857667',
  appId: '1:988779857667:web:e025f43ef812eabd16cb36',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage()