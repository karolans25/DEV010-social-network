import {
  onSnapshot, query, collection, orderBy, where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { header } from './header';
import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatPost } from './formatPost';
import { feedHandler } from '../handlers/feedHandler';
import { popup } from './popup';
import AuthService from '../firebase/authService';

import imgLoading from '../assets/icons/playground.gif';
import imgEditButton from '../assets/icons/edit.png';
import imgDeleteButton from '../assets/icons/delete.png';
import imgSaveButton from '../assets/icons/save.png';
import imgCancelButton from '../assets/icons/cruzar.png';

// import { TITLE } from '../consts/const';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  // document.querySelector(`.${thumbnailId}`).appendChild(closeButton);
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

const createThumbnail = (file, id, container) => {
  const thumbnail = document.createElement('figure');
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  if (file instanceof File) {
    thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file)})`);
  } else {
    thumbnail.setAttribute('style', `background-image: url(${file})`);
  }
  // const container = document.querySelector('.edit-post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
};

const fillPostData = (urls, container) => {
  if (Array.isArray(urls)) {
    if (urls.length === 0) {
      container.style.display = 'none';
    } else {
      container.style.display = 'grid';
    }
    urls.forEach((url) => {
      const img = document.createElement('img');
      img.className = 'post-img';
      img.src = url;
      img.alt = 'img post';
      container.appendChild(img);
    });
  }
};

export const myPosts = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const head = await header(navigateTo);
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  const sectionFormatCreatePost = await formatCreatePost();
  const sectionGetAllPosts = document.createElement('section');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');
  const imgEdit = document.createElement('img');
  const imgDelete = document.createElement('img');

  section.classList.value = 'home';
  subSection.className = 'myPosts';
  sectionGetAllPosts.className = 'get-posts';
  sectionGetAllPosts.innerHTML = '';
  // title.innerHTML = `${TITLE} - My Posts`;
  title.innerHTML = 'My Posts';
  title.style.marginTop = '30px';
  imgEdit.src = imgEditButton;
  imgEdit.alt = 'edit';
  imgDelete.src = imgDeleteButton;
  imgDelete.alt = 'delete';

  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  const id = await AuthService.getCurrentUser().uid;

  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'), where('idUser', '==', id));
  onSnapshot(q, (snapshot) => {
    sectionGetAllPosts.innerHTML = '';
    const posts = [];
    snapshot.docs.forEach((documentPost) => {
      posts.push({ ...documentPost.data(), id: documentPost.id });
    });
    if (posts.length === 0) {
      popup('You don\'t have any post yet');
      const text = document.createElement('h2');
      text.innerHTML = '😓 There\'s no post yet!<br>This is your chance to start 😎🥳';
      sectionGetAllPosts.appendChild(text);
    }
    sectionGetAllPosts.innerHTML = '';
    posts.forEach(async (item) => {
      const formatForEachPost = await formatPost(item);

      const initButtons = document.createElement('section');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      const updateButtons = document.createElement('section');
      const iconAddFile = document.createElement('img');
      const saveButton = document.createElement('button');
      const cancelButton = document.createElement('button');
      const textarea = document.createElement('textarea');
      const file = document.createElement('input');

      let formData = new FormData();

      formatForEachPost.classList.add('show-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
      initButtons.classList.add('init-buttons', item.id);
      updateButtons.classList.add('edit-file-update');

      updateButtons.appendChild(iconAddFile);
      updateButtons.appendChild(file);
      updateButtons.appendChild(saveButton);
      updateButtons.appendChild(cancelButton);

      initButtons.appendChild(editButton);
      initButtons.appendChild(deleteButton);

      const createdAt = formatForEachPost.querySelector('.created-timestamp');
      const postText = formatForEachPost.querySelector('p.post-text');
      const postFigureContainer = formatForEachPost.querySelector('.post-figure');
      editButton.classList.add('edit-button', item.id);
      editButton.appendChild(imgEdit);
      deleteButton.appendChild(imgDelete);
      deleteButton.classList.add('delete-button', item.id);
      createdAt.before(initButtons);
      saveButton.classList.add('save-button', item.id);
      const imgSave = document.createElement('img');
      imgSave.alt = 'save';
      // cancelButton.textContent = 'Cancel';
      cancelButton.classList.add('cancel-button', item.id);
      const imgCancel = document.createElement('img');
      imgCancel.alt = 'cancel';
      imgSave.src = imgSaveButton;
      imgCancel.src = imgCancelButton;
      saveButton.appendChild(imgSave);
      cancelButton.appendChild(imgCancel);

      editButton.addEventListener('click', async () => {
        createdAt.style.display = 'none';
        postText.style.display = 'none';
        postFigureContainer.style.display = 'block';
        updateButtons.style.display = 'grid';
        textarea.style.display = 'block';
        initButtons.append(updateButtons);
        initButtons.append(textarea);

        textarea.classList.add('post-text');
        textarea.innerHTML = postText.textContent;
        // saveButton.textContent = 'Save';
        iconAddFile.className = 'icon-add-file';
        file.className = 'file-upload';

        file.type = 'file';
        file.setAttribute('accept', 'image/*,video/*');
        file.setAttribute('multiple', 'true');
        file.name = 'file[]';
        file.classList.add('file', 'edit-file-post');

        postFigureContainer.innerHTML = '';
        item.URL.forEach((url) => {
          const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
          createThumbnail(url, thumbnailId, postFigureContainer);
          formData.append(thumbnailId, url);
        });

        // Listener for close button in images
        postFigureContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('close-button')) {
            e.target.parentNode.remove(); // Better than a loop through the thumbnails
            formData.delete(e.target.parentNode.dataset.id);
          }
        });

        // Possibility to upload new images
        file.addEventListener('change', (e) => {
          for (let iterator = 0; iterator < e.target.files.length; iterator++) {
            const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
            createThumbnail(e.target.files[iterator], thumbnailId, postFigureContainer);
            formData.append(thumbnailId, e.target.files[iterator]);
          }
          e.target.value = '';
        });

        // Save the changes for the post
        saveButton.addEventListener('click', async () => {
          try {
            if (textarea.value !== '') {
              loadingContainer.style.display = 'block';
              formData.append('text', textarea.value);
              const res = await feedHandler.updatePost(item.id, formData);
              loadingContainer.style.display = 'none';
              popup(res);
              if (res === 'The post has been updated') {
                updateButtons.style.display = 'none';
                textarea.style.display = 'none';
                createdAt.style.display = 'block';
                postText.style.display = 'block';
                postFigureContainer.innerHTML = '';
                fillPostData(item.URL, postFigureContainer);
                formData = new FormData();
              }
            } else {
              popup('You haven\'t writen anything. Please write something for your post');
            }
          } catch (err) {
            loadingContainer.style.display = 'none';
            popup(err.message);
          }
        });

        // Ignore the changes edited
        cancelButton.addEventListener('click', () => {
          updateButtons.style.display = 'none';
          textarea.style.display = 'none';
          createdAt.style.display = 'block';
          postText.style.display = 'block';
          postFigureContainer.innerHTML = '';
          fillPostData(item.URL, postFigureContainer);
          // formData.forEach((value, key) => formData.delete(key));
          formData = new FormData();
        });
      });

      // Delete the post
      deleteButton.addEventListener('click', async () => {
        try {
          loadingContainer.style.display = 'block';
          const res = await feedHandler.deletePost(item.id);
          loadingContainer.style.display = 'none';
          popup(res);
          formData = new FormData();
        } catch (err) {
          loadingContainer.style.display = 'none';
          popup(err.message);
        }
      });

      formatForEachPost.classList.add('show-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
    });
  });
  // sectionFormatGetAllPost.append(sectionGetAllPosts);
  subSection.append(sectionFormatCreatePost, title, sectionGetAllPosts);
  section.append(head, subSection, nav);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  return section;
};

// export default myPosts;
