// import {
//   collection, query, orderBy,
// } from 'firebase/firestore';
import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
// import formatGetAllPosts from './formatGetAllPosts';

export const feed = (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navbar(navigateTo);
  const sectionFormatCreatePost = formatCreatePost();
  const title = document.createElement('h2');
  // const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
  // const sectionFormatGetAllPost = formatGetAllPosts(q);
  // const createdAt = document.querySelector('.created-at');

  section.classList.value = 'home';
  subSection.className = 'feed';
  title.innerHTML = 'Caro PG';
  // subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPost);
  subSection.append(sectionFormatCreatePost, title); // , sectionFormatGetAllPost);
  section.append(subSection, nav);

  // const list = document.getElementsByClassName('list');
  // for (let i = 0; i < list.length; i++) {
  //   list[i].classList.remove('active');
  //   if (list[i].id === 'list-feed') {
  //     list[i].classList.add('active');
  //   }
  // }

  return section;
};

// export default feed;
