import {onAuthStateChanged,signInWithEmailAndPassword,signOut, signInWithPopup,auth,GoogleAuthProvider } from "../firebase.js";

let email = document.getElementById('email')
let password = document.getElementById('password')
let signBtn = document.getElementById('signInBtn')



const sigInAdmin = ()=>{
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Admin SignIn")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

signBtn.addEventListener('click',sigInAdmin);



onAuthStateChanged(auth, (user) => {
    if (user) {
    window.location.href = './dashboard.html'
    } 
  });
  
