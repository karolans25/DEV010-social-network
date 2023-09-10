// import { auth } from '../firebase/firebaseConfig';
import { feedHandler } from '../handlers/feedHandler';
import { popup } from './popup';

import imgLoading from '../assets/icons/playground.gif';
import imgAddFile from '../assets/icons/file.png';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  // document.querySelector(`.${thumbnailId}`).appendChild(closeButton); => DOESN'T WORK
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

const createThumbnail = (file, id) => {
  const thumbnail = document.createElement('figure');
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file)})`);
  const container = document.querySelector('.post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
};

export const formatCreatePost = async () => {
  const sectionCreatePost = document.createElement('section');
  const sectionTitle = document.createElement('section');
  const sectionPost = document.createElement('section');
  const userFigure = document.createElement('figure');
  const userImg = document.createElement('img');
  const userName = document.createElement('h3');
  // const labelAddFile = document.createElement('label');
  const iconAddFile = document.createElement('img');
  const file = document.createElement('input');
  const postText = document.createElement('textarea');
  const postImgContainer = document.createElement('section');
  const buttonPublish = document.createElement('button');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  let formData = new FormData();

  const data = await feedHandler.getUserData();
  userName.innerHTML = data[1];
  userImg.src = data[2];

  sectionCreatePost.className = 'create-post';
  sectionTitle.className = 'header-post';
  sectionPost.className = 'body-post';

  userFigure.className = 'user-figure';
  userImg.className = 'user-img';

  // labelAddFile.className = 'label-add-file';
  iconAddFile.className = 'icon-add-file';
  iconAddFile.src = imgAddFile;
  iconAddFile.alt = 'add file';
  file.classList.add('file', 'file-upload');
  file.type = 'file';
  file.setAttribute('accept', 'image/*,video/*');
  file.setAttribute('multiple', 'true');
  file.name = 'file[]';
  buttonPublish.style.justifySelf = 'center';
  buttonPublish.innerHTML = 'Publish';
  buttonPublish.classList.add('publish-button');
  // labelAddFile.htmlFor = 'file-upload';
  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  postImgContainer.className = 'post-figure';
  postText.placeholder = 'What do you want to say?';
  postText.className = 'post-text';
  file.type = 'file';
  file.setAttribute('accept', 'image/*');

  file.addEventListener('change', (e) => {
    for (let iterator = 0; iterator < e.target.files.length; iterator++) {
      const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
      createThumbnail(e.target.files[iterator], thumbnailId);
      formData.append(thumbnailId, e.target.files[iterator]); // key: thumbnailId, value: file
    }
    e.target.value = '';
  });

  postImgContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('close-button')) {
      e.target.parentNode.remove(); // Better than a loop through the thumbnails
      formData.delete(e.target.parentNode.dataset.id);
      if (postImgContainer.children.length === 0) {
        postImgContainer.style.display = 'none';
      }
    }
  });

  buttonPublish.addEventListener('click', async () => {
    try {
      loadingContainer.style.display = 'block';
      if (postText.value !== '') {
        formData.append('text', postText.value);
        const res = await feedHandler.createPost(formData);
        if (res === 'The post has been created') {
          loadingContainer.style.display = 'none';
          popup(res);
          postText.value = '';
          postImgContainer.innerHTML = '';
          postImgContainer.style.display = 'none';
          // formData.forEach((value, key) => formData.delete(key));
          formData = new FormData();
        }
      } else {
        loadingContainer.style.display = 'none';
        popup('You haven\'t writen anything. Please write something for your post');
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  sectionTitle.append(userFigure, userName, iconAddFile, file);
  userFigure.append(userImg);
  sectionPost.appendChild(postText);
  sectionPost.appendChild(postImgContainer);
  sectionCreatePost.appendChild(sectionTitle);
  sectionCreatePost.appendChild(sectionPost);
  sectionCreatePost.appendChild(buttonPublish);
  loadingContainer.append(loadingGif);
  sectionCreatePost.append(loadingContainer);

  return sectionCreatePost;
};

// export default formatCreatePost;
