// import { auth } from '../lib/firebaseConfig';
// import { createPost } from '../lib/user';
// import popup from './popup';

// const createCloseButton = (thumbnailId) => {
//   const closeButton = document.createElement('section');
//   closeButton.classList.add('close-button');
//   closeButton.innerText = 'x';
//   // document.querySelector(`.${thumbnailId}`).appendChild(closeButton);
//   document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
// };

// const createThumbnail = (file, id) => {
//   const thumbnail = document.createElement('figure');
//   thumbnail.classList.add('thumbnail', id);
//   thumbnail.dataset.id = id;

//   thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file)})`);
//   const container = document.querySelector('.post-figure'); // postImgContainer
//   container.appendChild(thumbnail);
//   container.style.display = 'grid';
//   createCloseButton(id);
// };

// function formatCreatePost() {
//   const sectionCreatePost = document.createElement('section');
//   const sectionTitle = document.createElement('section');
//   const sectionPost = document.createElement('section');
//   const userFigure = document.createElement('figure');
//   const userImg = document.createElement('img');
//   const userName = document.createElement('h2');
//   // const labelAddFile = document.createElement('label');
//   const iconAddFile = document.createElement('img');
//   const file = document.createElement('input');
//   const postText = document.createElement('textarea');
//   const postImgContainer = document.createElement('section');
//   const buttonPublish = document.createElement('button');
//   const sectionPreload = document.createElement('section'); // preload
//   const preloadGif = document.createElement('img');

//   const user = auth.currentUser;
//   let formData = new FormData();

//   sectionCreatePost.className = 'create-post';
//   sectionTitle.className = 'header-post';
//   sectionPost.className = 'body-post';

//   userName.innerHTML = user.displayName;
//   userImg.src = user.photoURL;

//   userFigure.className = 'user-figure';
//   userImg.className = 'user-img';

//   // labelAddFile.className = 'label-add-file';
//   iconAddFile.className = 'icon-add-file';
//   file.classList.add('file', 'file-upload');

//   file.type = 'file';
//   file.setAttribute('accept', 'image/*,video/*');
//   file.setAttribute('multiple', 'true');
//   file.name = 'file[]';
//   buttonPublish.style.justifySelf = 'center';
//   // labelAddFile.htmlFor = 'file-upload';

//   postImgContainer.className = 'post-figure';
//   postText.placeholder = 'What do you want to say?';
//   postText.className = 'post-text';
//   file.type = 'file';
//   file.setAttribute('accept', 'image/*');
//   file.addEventListener('change', (e) => {
//     for (let iterator = 0; iterator < e.target.files.length; iterator++) {
//       const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
//       createThumbnail(e.target.files[iterator], thumbnailId);
//       formData.append(thumbnailId, e.target.files[iterator]); // key: thumbnailId, value: file
//     }
//     e.target.value = ''; // The data is saved in form Data and clear the input file value
//   });
//   postImgContainer.addEventListener('click', (e) => {
//     if (e.target.classList.contains('close-button')) {
//       e.target.parentNode.remove(); // Better than a loop through the thumbnails
//       formData.delete(e.target.parentNode.dataset.id);
//       if (postImgContainer.children.length === 0) {
//         postImgContainer.style.display = 'none';
//       }
//     }
//   });
//   buttonPublish.textContent = 'Publish';
//   buttonPublish.addEventListener('click', () => {
//     if (postText.value !== '') {
//       formData.append('text', postText.value);
//       formData.forEach((value, key) => {
//         console.log(key);
//         console.log(value);
//       });
//       createPost(formData).then((res) => {
//         if (res.includes('The post has been created')) {
//           popup(res);
//           postText.value = '';
//           postImgContainer.innerHTML = '';
//           postImgContainer.style.display = 'none';
//           // formData.forEach((value, key) => formData.delete(key));
//           formData = new FormData();
//         }
//       }).catch((err) => popup(err.message));
//     } else {
//       popup('You haven\'t writen anything. Please write something for your post');
//     }
//   });

//   sectionPreload.className = 'preload';
//   preloadGif.className = 'preload-gif';
//   preloadGif.src = './assets/icons/playground.gif';
//   preloadGif.alt = 'preload';

//   sectionPreload.appendChild(preloadGif);
//   // labelAddFile.appendChild(iconAddFile);
//   sectionTitle.append(userFigure, userName, iconAddFile, file);
//   userFigure.append(userImg);
//   sectionPost.appendChild(postText);
//   sectionPost.appendChild(postImgContainer);
//   sectionCreatePost.appendChild(sectionTitle);
//   sectionCreatePost.appendChild(sectionPost);
//   sectionCreatePost.appendChild(buttonPublish);
//   sectionCreatePost.appendChild(sectionPreload);

//   return sectionCreatePost;
// }

// export default formatCreatePost;
