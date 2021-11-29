// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgr8lsYqHZ-GM94Dlup8uwfwbj83MEnd4",
    authDomain: "uber-next-clone-live-5d6ce.firebaseapp.com",
    projectId: "uber-next-clone-live-5d6ce",
    storageBucket: "uber-next-clone-live-5d6ce.appspot.com",
    messagingSenderId: "290205744668",
    appId: "1:290205744668:web:2539b18f71d48aaf3229d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };