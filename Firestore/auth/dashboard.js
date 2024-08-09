import {getDocs,db,collection,onAuthStateChanged,signOut, auth } from "../firebase.js";

let logoutBtn = document.getElementById('logout');
let data = document.querySelector('.data')
let loader = document.getElementById('loader');
loader.style.display = 'none';


const logout = ()=>{
    console.log('clicked')
    signOut(auth).then(() => {
        window.location.href = './login.html';
      }).catch((error) => {
         console.log(error);
      });
}

logoutBtn.addEventListener('click',logout);

const getAssignments = async()=>{
  loader.style.display = 'block';
 try{
  const querySnapshot = await getDocs(collection(db, "assignments"));
  querySnapshot.forEach((doc) => {
      const {studentName,AssignmentLink} = doc.data();
      data.innerHTML+= `
      <p>${studentName}</p>
      <a href="${AssignmentLink}">${AssignmentLink}</a>
      <button>Edit</button>
      <button>Delete</button>
      `
});
 }
 catch(error){
  console.log(error)
 }
 finally{
  loader.style.display = 'none';
 }
}
getAssignments();



onAuthStateChanged(auth, (user) => {
    if (!user) {
    window.location.href = './login.html'
    } 
  });
