import {
  collection, query, where, orderBy, getDoc, doc,
} from 'firebase/firestore';
import { auth, db } from '../lib/firebaseConfig';
import { navBar } from './navBar';
import formatCreatePost from './formatCreatePost';
import formatGetAllPosts from './formatGetAllPosts';
import popup from './popup';
import { updatePost, deletePost } from '../lib/user';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  // document.querySelector(`.${thumbnailId}`).appendChild(closeButton);
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

const createThumbnail = (url, id) => {
  const thumbnail = document.createElement('figure');
  console.log(thumbnail);
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  thumbnail.setAttribute('style', `background-image: url(${url})`);
  const subContainer = document.querySelector('.section-edit-post');
  const container = subContainer.querySelector('.post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
};

const createThumbnailFile = (file, iterator, id) => {
  const thumbnail = document.createElement('figure');
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file.files[iterator])})`);
  const container = document.querySelector('.edit-post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
};

function myPosts(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const sectionFormatCreatePost = formatCreatePost();
  const title = document.createElement('h1');
  const nav = navBar(navigateTo);

  const user = auth.currentUser;
  const q = query(collection(db, 'post'), where('idUser', '==', `${user.uid}`), orderBy('createdAt', 'desc'));
  const sectionFormatGetAllPost = formatGetAllPosts(q);

  section.classList.value = 'home';
  subSection.className = 'feed';

  title.innerHTML = 'My Publications';

  /** section edit and delete */
  const sectionInitButtons = document.createElement('section');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  editButton.textContent = 'Edit';
  deleteButton.textContent = 'Delete';
  sectionInitButtons.append(editButton, deleteButton);

  const id = 'AD6c8AXJUqrVCr5fNhm2';
  sectionInitButtons.classList.add('section-edit-post', id);

  editButton.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const figure = document.createElement('figure');
    const saveButton = document.createElement('button');
    const labelAddFile = document.createElement('label');
    const iconAddFile = document.createElement('img');
    const file = document.createElement('input');
    const formData = new FormData();
    textarea.classList.add('post-text');
    figure.classList.add('post-figure', 'edit-post-figure');
    figure.style.display = 'block';
    saveButton.textContent = 'Update';
    labelAddFile.className = 'label-add-file';
    iconAddFile.className = 'icon-add-file';
    file.className = 'file-upload';

    file.type = 'file';
    file.setAttribute('accept', 'image/*,video/*');
    file.setAttribute('multiple', 'true');
    file.name = 'file[]';
    labelAddFile.htmlFor = 'file-upload';
    file.classList.add('file', 'edit-file-post');
    file.type = 'file';
    file.setAttribute('accept', 'image/*');

    /** Upload the data of the post */
    getDoc(doc(db, 'post', id))
      .then((document) => {
        textarea.value = document.data().text;
        const urls = document.data().URL;
        for (let i = 0; i < urls.length; i++) {
          const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
          createThumbnail(urls[i], thumbnailId);
          formData.append(thumbnailId, urls[i]); // key: thumbnailId, value: file
        }
      });

    /** Possibility to upload new images */
    file.addEventListener('change', (e) => {
      for (let iterator = 0; iterator < e.target.files.length; iterator++) {
        const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
        createThumbnailFile(e.target, iterator, thumbnailId);
        formData.append(thumbnailId, e.target.files[iterator]); // key: thumbnailId, value: file
      }
      e.target.value = ''; // The data is saved in form Data and clear the input file value
    });

    /** Listener for close button in images */
    figure.addEventListener('click', (e) => {
      if (e.target.classList.contains('close-button')) {
        e.target.parentNode.remove(); // Better than a loop through the thumbnails
        formData.delete(e.target.parentNode.dataset.id);
      }
    });

    saveButton.addEventListener('click', () => {
      if (textarea.value !== '') {
        formData.append('text', textarea.value);
        updatePost(formData).then((response) => {
          if (response.includes('The post has been created')) {
            popup(response);
            textarea.value = '';
            figure.innerHTML = '';
            formData.forEach((value, key) => formData.delete(key));
          }
        }).catch((err) => popup(err.message));
      } else {
        popup('You haven\'t writen anything. Please write something for your post');
      }
    });

    deleteButton.addEventListener('click', () => deletePost(id));

    labelAddFile.appendChild(iconAddFile);
    sectionInitButtons.append(labelAddFile, file, textarea, figure, saveButton);
    // updateDoc(doc(db, 'like', idLike), {
    //   idTypeLike: idType,
    //   likedAt: serverTimestamp(),
    // });
  });
  /** section edit and delete */

  sectionFormatGetAllPost.addEventListener('DOMContentLoaded', () => {
    const foundPosts = sectionFormatGetAllPost.querySelectorAll('.container-found-post');
    console.log(foundPosts);
  });
  // document.addEventListener('DOMContentLoaded', () => {
  //   const ps = document.querySelectorAll('.created-timestamp');

  //   let sectionInitButtons;
  //   ps.forEach((item) => {
  //     const [, idPub] = item.classList;
  //     sectionInitButtons = document.createElement('section');
  //     const editButton = document.createElement('button');
  //     const deleteButton = document.createElement('button');
  //     editButton.classList.add('edit-post-button', idPub);
  //     deleteButton.classList.add('delete-post-button', idPub);
  //     editButton.textContent = 'Edit';
  //     deleteButton.textContent = 'Delete';
  //     sectionInitButtons.appendChild(editButton);
  //     sectionInitButtons.appendChild(deleteButton);
  //     console.log('item');
  //     // item.before(editButton);
  //     // item.before(deleteButton);
  //     item.before(sectionInitButtons);
  //     // item.style.display = 'block';
  //   });

  //   sectionInitButtons.addEventListener('click', (e) => {
  //     console.log(e.target);
  //   });
  // });

  subSection.append(sectionFormatCreatePost, title, sectionInitButtons, sectionFormatGetAllPost);
  section.append(subSection, nav);

  // const list = document.getElementsByClassName('list');
  // for (let i = 0; i < list.length; i++) {
  //   list[i].classList.remove('active');
  //   if (list[i].id === 'list-feed') {
  //     list[i].classList.add('active');
  //   }
  // }

  return section;
}

export default myPosts;
