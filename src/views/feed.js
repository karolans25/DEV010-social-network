import {
  onSnapshot, query, collection, orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { header } from './header';
import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatPost } from './formatPost';
// import { popup } from './popup';

import imgLoading from '../assets/icons/playground.gif';

export const feed = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const head = await header(navigateTo);
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
  title.innerHTML = 'Feed';
  title.style.marginTop = '30px';
  title.style.justifySelf = 'center';

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
      // popup('You don\'t have any post yet');
      const text = document.createElement('h2');
      text.innerHTML = '😓 There\'s no post yet!<br>This is your chance to start 😎🥳';
      sectionGetAllPosts.appendChild(text);
    }
    sectionGetAllPosts.innerHTML = '';
    posts.forEach(async (item) => {
      const formatForEachPost = await formatPost(item);
      const imgSave = document.createElement('img');
      imgSave.alt = 'save';
      const imgCancel = document.createElement('img');
      imgCancel.alt = 'cancel';
      formatForEachPost.classList.add('show-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
    });
  });

  subSection.append(sectionFormatCreatePost, title, sectionGetAllPosts);
  section.append(head, subSection, nav);
  loadingContainer.append(loadingGif);
  section.append(loadingContainer);

  return section;
};
