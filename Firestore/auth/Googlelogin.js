import {signOut, signInWithPopup,auth,GoogleAuthProvider } from "../firebase.js";

let googleBtn = document.getElementById('googleBtn');
const provider = new GoogleAuthProvider();

const googleSignIn = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
     
    });
}
const logout = ()=>{
    signOut(auth).then(() => {
        alert("logout");
      }).catch((error) => {
        // An error happened.
      });
}

googleBtn.addEventListener('click',googleSignIn)

logoutBtn.addEventListener('click',logout);