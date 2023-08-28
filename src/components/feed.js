import {
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { navBar } from './navBar';
import formatCreatePost from './formatCreatePost';
import formatGetAllPosts from './formatGetAllPosts';

function feed(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar(navigateTo);

  section.classList.value = 'home';
  subSection.className = 'feed';

  const sectionFormatCreatePost = formatCreatePost();
  const title = document.createElement('h1');
  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
  const sectionFormatGetAllPost = formatGetAllPosts(q);

  title.innerHTML = 'TITLE';
  subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPost);
  section.append(subSection, nav);

  const createdAt = document.querySelector('.created-at');
  // const list = document.getElementsByClassName('list');
  // for (let i = 0; i < list.length; i++) {
  //   list[i].classList.remove('active');
  //   if (list[i].id === 'list-feed') {
  //     list[i].classList.add('active');
  //   }
  // }

  return section;
}

export default feed;
