  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  import {onAuthStateChanged,signInWithEmailAndPassword,signOut, signInWithPopup,getAuth,GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
  import { getDocs,getFirestore,collection, addDoc  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCsWDr20gqONOXkq7zj2T4OIKUxsKoXlhw",
    authDomain: "smit-batch-11-fc8d1.firebaseapp.com",
    projectId: "smit-batch-11-fc8d1",
    storageBucket: "smit-batch-11-fc8d1.appspot.com",
    messagingSenderId: "231207605801",
    appId: "1:231207605801:web:508867a521ffaf0a1a6e38",
    measurementId: "G-DCD1X6ZBDX"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);


  export {getDocs,collection, addDoc,db, onAuthStateChanged,signInWithEmailAndPassword,signOut,signInWithPopup,auth,GoogleAuthProvider}