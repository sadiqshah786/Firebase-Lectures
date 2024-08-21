import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyAjz0WmPNI3-9-Z3UDbqsNP2PaA24MQFZ0",
    authDomain: "test-app-f4c6f.firebaseapp.com",
    projectId: "test-app-f4c6f",
    storageBucket: "test-app-f4c6f.appspot.com",
    messagingSenderId: "455900792964",
    appId: "1:455900792964:web:4aba413ab8709621dc5ad1",
    measurementId: "G-R888DDLGQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export { getDownloadURL, storage, ref, uploadBytes, uploadBytesResumable };