// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_mxPyoaJ8KvTRVAdWeB4cwPfVV9ZFlfQ",
  authDomain: "movies-management-5eaab.firebaseapp.com",
  projectId: "movies-management-5eaab",
  storageBucket: "movies-management-5eaab.appspot.com",
  messagingSenderId: "593035503165",
  appId: "1:593035503165:web:98c83c8870a6707a9bac54",
  measurementId: "G-828QK252BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();
export {storage,googleAuthProvider,auth};

