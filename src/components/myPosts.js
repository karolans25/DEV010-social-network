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

  // Init
  const ps = document.querySelectorAll('.created-timestamp');

  let sectionInitButtons;
  ps.forEach((item) => {
    const [, idPub] = item.classList;
    sectionInitButtons = document.createElement('section');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    editButton.classList.add('edit-post-button', idPub);
    deleteButton.classList.add('delete-post-button', idPub);
    editButton.textContent = 'Edit';
    deleteButton.textContent = 'Delete';
    sectionInitButtons.appendChild(editButton);
    sectionInitButtons.appendChild(deleteButton);
    console.log('item');
    // item.before(editButton);
    // item.before(deleteButton);
    item.before(sectionInitButtons);
    // item.style.display = 'block';
    sectionInitButtons.addEventListener('click', (e) => {
      console.log(e.target);
    });
  });
  // End

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
