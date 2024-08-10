import { updateDoc, getDoc, doc, deleteDoc, getDocs, db, collection, onAuthStateChanged, signOut, auth } from "../firebase.js";



let logoutBtn = document.getElementById('logout');
let data = document.querySelector('.data')
let loader = document.getElementById('loader');
loader.style.display = 'none';
let formUpdateName = document.getElementById('stdName');
let formUpdateLink = document.getElementById('link');
let updateBtn = document.getElementById('update');
let isEdit = null;
let form = document.querySelector('.form');
form.style.display = "none";

const logout = () => {
  console.log('clicked')
  signOut(auth).then(() => {
    window.location.href = './login.html';
  }).catch((error) => {
    console.log(error);
  });
}

logoutBtn.addEventListener('click', logout);

const getAssignments = async () => {
  data.innerHTML = '';
  loader.style.display = 'block';
  try {
    const querySnapshot = await getDocs(collection(db, "assignments"));

    if (querySnapshot.empty) {
      data.innerHTML = 'bhai sb chala gya';
    }


    querySnapshot.forEach((doc) => {

      console.log(doc.data(), doc.id);

      const { studentName, AssignmentLink } = doc.data();
      data.innerHTML += `
      <p>${studentName}</p>
      <a href="${AssignmentLink}">${AssignmentLink}</a>
      <button class="${doc.id}" onclick="editData('${doc.id}',this)" >Edit</button>
      <button class="${doc.id}" onclick="deleteData('${doc.id}',this)">Delete</button>
      `
    });
  }
  catch (error) {
    console.log(error)
  }
  finally {
    loader.style.display = 'none';
  }
}



// document.addEventListener('click',)




// function editData() {
//   console.log('edit')
// }

// function deleteData() {
//   console.log('delete')
// }

window.editData = async (id, e) => {
  try {
    let userData = await getDoc(doc(db, "assignments", id));
    const { AssignmentLink, studentName } = userData.data();
    formUpdateName.value = studentName;
    formUpdateLink.value = AssignmentLink;
    isEdit = id;
    form.style.display = "block";
  }
  catch (error) {
    console.log(error);
  }
}


const updateData = async () => {
  updateBtn.innerText = "Updating......"
  try {
    await updateDoc(doc(db, "assignments", isEdit), {
      studentName: formUpdateName.value,
      AssignmentLink: formUpdateLink.value
    });
    getAssignments();
  }
  catch (error) {
    console.log(error);
  }
  finally {
    updateBtn.innerText = "update"
    form.style.display = "none";
  }
}
updateBtn.addEventListener('click', updateData);


window.deleteData = async (id, button) => {
  button.innerText = "Deleting......"
  try {
    await deleteDoc(doc(db, "assignments", id));
    getAssignments();
  }
  catch (error) {
    console.log(error);
  }
}




getAssignments();







onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = './login.html'
  }
});
