import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import { doc, getDoc, getDocs, collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAdLADtAeuLIsyY-ahIC0yd6gYT8lJcufY",
    authDomain: "crud-app-528a2.firebaseapp.com",
    projectId: "crud-app-528a2",
    storageBucket: "crud-app-528a2.appspot.com",
    messagingSenderId: "866927823724",
    appId: "1:866927823724:web:291e7cde677f72eea04149",
    measurementId: "G-RKHQVX9XW4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


export { doc, getDoc, getDocs, db, collection, addDoc, getDownloadURL, storage, ref, uploadBytes, uploadBytesResumable };