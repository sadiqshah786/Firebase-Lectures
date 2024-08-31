import { db, doc, getDoc } from "./firebase.js";


let detaildata = document.querySelector('.detaildata');
let getId = localStorage.getItem('blogId');
console.log(getId);


const showSingleData = async () => {
    detaildata.innerHTML = 'loading........'
    const docRef = doc(db, "blogs", getId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const { title, description, blogImg } = docSnap.data();
        detaildata.innerHTML = `
        <img src="${blogImg}"/>
        <h3>${title}</h3>
        <p>${description}</p>
        `
    } else {
        console.log("No such document!");
    }
}
showSingleData();