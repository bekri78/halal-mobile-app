// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "@firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCithW-fJEgeuKe6QQPTBbzksURzQncPXw",
    authDomain: "halal-mobile-app.firebaseapp.com",
    projectId: "halal-mobile-app",
    storageBucket: "halal-mobile-app.appspot.com",
    messagingSenderId: 982610840900,
    appId: "1:982610840900:web:983eb97a62e876e6d29b11",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)