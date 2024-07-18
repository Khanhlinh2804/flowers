import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";



// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKQC2Hzxavccvtm-3JYyDgpTP7zKLmmnA",
    authDomain: "flower1-vue.firebaseapp.com",
    projectId: "flower1-vue",
    storageBucket: "flower1-vue.appspot.com",
    messagingSenderId: "578197854123",
    appId: "1:578197854123:web:cd81a6f530f237560764ee"
};

// Initialize Firebase
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth , provider};