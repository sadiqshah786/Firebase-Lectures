import { getDownloadURL, storage, ref, uploadBytes, uploadBytesResumable } from "./firebase.js";

let image = document.getElementById('image');
let upload = document.getElementById('upload');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let cancel = document.getElementById('cancel');
let state = document.querySelector('#state');
let loader = document.getElementById('loader');
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


start.addEventListener('click', () => {
    console.log('start');
    uploadTask.resume();

})

stop.addEventListener('click', () => {
    console.log('stop');
    uploadTask.pause();

})

cancel.addEventListener('click', () => {
    console.log('cancel');
    uploadTask.cancel();
})



// upload.addEventListener('click', () => {
//     console.log(storage);
// });




const uploaddata = async () => {
    try {
        const docRef = await addDoc(collection(db, "users"),
            {
                title: "sadiq",
                dis: "sdjfghdkfghdk",
                image: getImage
            });
        abc.innerHTML = `
            <p>{title}</p>
            <p>{dis}</p>
            <img src="{image}"/>
            `
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}



