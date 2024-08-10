import { getDocs, db, collection, addDoc } from './firebase.js';

let stdName = document.getElementById('stdName');
let Assignmentlink = document.getElementById('link');
let docBtn = document.getElementById('add');
let data = document.querySelector('.data')
let loader = document.getElementById('loader');
loader.style.display = 'none';
const AddAssignments = async () => {
  if (stdName.value !== '' && Assignmentlink.value !== '') {

    docBtn.innerText = "loading......."

    try {
      const docRef = await addDoc(collection(db, "assignments"), {
        studentName: stdName.value,
        AssignmentLink: Assignmentlink.value
      });
      console.log("Document written with ID: ", docRef.id);
      getAssignments();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    finally {
      docBtn.innerText = "Add"
    }

  }

  stdName.value = '';
  Assignmentlink.value = '';
}

// const AddAssignments = ()=>{
//     if(stdName.value !=='' && Assignmentlink.value !==''){
//         addDoc(collection(db, "users"), {
//             first: "Ada",
//             last: "Lovelace",
//             born: 1815
//           })
//           .then((data)=>{

//           })
//           .catch((error)=>{

//           })
//     }
// }
docBtn.addEventListener('click', AddAssignments);


const getAssignments = async () => {
  loader.style.display = 'block';
  data.innerHTML = '';
  try {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    if (querySnapshot.empty) {
      data.innerHTML += "Data is not found"
    }
    querySnapshot.forEach((doc) => {
      const { studentName, AssignmentLink } = doc.data();
      data.innerHTML += `
        <p>${studentName}</p>
        <a href="${AssignmentLink}">${AssignmentLink}</a>`
    });
  }
  catch (error) {
    console.log(error)
  }
  finally {
    loader.style.display = 'none';
  }
}
getAssignments();


