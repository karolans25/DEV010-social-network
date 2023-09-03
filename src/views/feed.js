// import {
//   collection, query, orderBy,
// } from 'firebase/firestore';
import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatGetAllPosts } from './formatGetAllPosts';
// import formatGetAllPosts from './formatGetAllPosts';

export const feed = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navbar(navigateTo);
  const sectionFormatCreatePost = formatCreatePost();
  const title = document.createElement('h2');
  const sectionFormatGetAllPosts = await formatGetAllPosts();

  section.classList.value = 'home';
  subSection.className = 'feed';
  title.innerHTML = 'Caro PG';
  // const posts = await feedHandler.getAllPost();
  // sectionGetAllPosts.className = 'get-posts';
  // sectionGetAllPosts.innerHTML = '';
  // posts.forEach((item) => {
  //   const formatForEachPost = formatPost(item);
  //   formatForEachPost.classList.add('container-found-post', item.id);
  //   sectionGetAllPosts.append(formatForEachPost);
  // });

  subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPosts);
  // subSection.append(sectionFormatCreatePost, title); // , sectionFormatGetAllPost);
  // subSection.append(title);
  section.append(subSection, nav);
  // subSection.appendChild(title);

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
