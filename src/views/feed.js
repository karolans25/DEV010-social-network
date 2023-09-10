import {
  onSnapshot, query, collection, orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatPost } from './formatPost';
import { popup } from './popup';

import { TITLE } from '../consts/const';
import imgLoading from '../assets/icons/playground.gif';

export const feed = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  const sectionFormatCreatePost = await formatCreatePost();
  const sectionGetAllPosts = document.createElement('section');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  section.classList.value = 'home';
  subSection.className = 'feed';
  sectionGetAllPosts.className = 'get-posts';
  sectionGetAllPosts.innerHTML = '';
  title.innerHTML = TITLE;
  title.style.marginTop = '30px';

  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
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
    console.log(posts);
    posts.forEach((item) => {
      const formatForEachPost = formatPost(item);
      const imgSave = document.createElement('img');
      imgSave.alt = 'save';
      const imgCancel = document.createElement('img');
      imgCancel.alt = 'cancel';
      formatForEachPost.classList.add('show-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
      // const formatForEachPost = formatPost(item);
      // const imgSave = document.createElement('img');
      // imgSave.alt = 'save';
      // const imgCancel = document.createElement('img');
      // imgCancel.alt = 'cancel';
      // formatForEachPost.classList.add('show-post', item.id);
      // sectionGetAllPosts.append(formatForEachPost);
    });
  });

  subSection.append(sectionFormatCreatePost, title, sectionGetAllPosts);
  section.append(subSection, nav);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  return section;
};
