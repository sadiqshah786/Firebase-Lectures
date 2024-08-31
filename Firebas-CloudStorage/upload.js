import { getDocs, db, collection, addDoc, getDownloadURL, storage, ref, uploadBytes, uploadBytesResumable, doc } from "./firebase.js";

let image = document.getElementById('image');
let upload = document.getElementById('upload');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let cancel = document.getElementById('cancel');
let state = document.querySelector('#state');
let loader = document.getElementById('loader');


let title = document.getElementById('title');
let description = document.getElementById('description');
let submit = document.getElementById('add');
let data = document.getElementById('data');

let getImage;
let uploadTask;
loader.style.display = 'none';

const uploadFile = () => {
    const files = image.files[0];
    console.log(files)
    if (files.size > 1019586) {
        console.log("bhai file bari hai")
    }
    else {
        const imagesRefWithFolder = ref(storage, `products/${files.name}`);
        uploadTask = uploadBytesResumable(imagesRefWithFolder, files);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // if (progress !== 100) {
                //     submit.innerText = "loading........."
                // }

                // if (progress > 100) {
                //     state.innerText = ''
                //     loader.style.display = 'none';
                // }
                // loader.style.display = 'block';
                // state.innerText = 'Upload is ' + progress + '% done'
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        getImage = downloadURL;
                    });
            }
        );
    }

    // withfolder

    // // without folder 
    // // const imagesRefWithoutFolder = ref(storage, files.name);

    // uploadBytes(imagesRefWithFolder, files)
    //     .then((snapshot) => {
    //         console.log('Uploaded a blob or file!', snapshot);
    //     });







}

image.addEventListener('change', uploadFile);


// start.addEventListener('click', () => {
//     console.log('start');
//     uploadTask.resume();

// })

// stop.addEventListener('click', () => {
//     console.log('stop');
//     uploadTask.pause();

// })

// cancel.addEventListener('click', () => {
//     console.log('cancel');
//     uploadTask.cancel();
// })



// upload.addEventListener('click', () => {
//     console.log(storage);
// });


const uploadData = async () => {
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title.value,
            description: description.value,
            blogImg: getImage
        });
        showBlogs();
        console.log("Document written with ID: ", docRef.id);
        // console.log(docRef.data())
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    console.log(title.value, description.value);
}

submit.addEventListener('click', uploadData);




const showBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogs"));
    querySnapshot.forEach((doc) => {
        console.log(doc.id);
        const { title, description, blogImg } = doc.data();
        data.innerHTML += `
        <h3>${title}</h3>
        <p>${description.slice(0, 100)}</p>
        <img src="${blogImg}"/>
        <button onclick="detailPage('${doc.id}')">view blog</button>
        `
    });

}
showBlogs();



window.detailPage = (id) => {
    localStorage.setItem('blogId', id);
    window.location.href = './blogDetail.html';
}