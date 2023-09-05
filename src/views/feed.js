import {
  onSnapshot, query, collection, orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatPost } from './formatPost';
import { TITLE } from '../consts/consts';

export const feed = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  const sectionFormatCreatePost = formatCreatePost();
  const sectionFormatGetAllPost = document.createElement('section');
  const sectionGetAllPosts = document.createElement('section');

  section.classList.value = 'home';
  subSection.className = 'feed';
  sectionGetAllPosts.className = 'get-posts';
  title.innerHTML = TITLE;
  title.style.marginTop = '50px';

  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((documentPost) => {
      posts.push({ ...documentPost.data(), id: documentPost.id });
    });
    sectionGetAllPosts.innerHTML = '';
    if (posts.length === 0) {
      const img = document.createElement('img');
      const paragraph = document.createElement('paragraph');
      img.src = '../src/assets/icons/not-found.png';
      sectionGetAllPosts.append(img, paragraph);
    }
    posts.forEach((item) => {
      const formatForEachPost = formatPost(item);
      formatForEachPost.classList.add('container-found-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
    });
  });
  // const posts = await feedHandler.getAllPost();
  // sectionGetAllPosts.innerHTML = '';
  // posts.forEach(async (item) => {
  //   const formatForEachPost = await formatPost(item);
  //   formatForEachPost.classList.add('container-found-post', item.id);
  //   sectionGetAllPosts.append(formatForEachPost);
  // });

  sectionFormatGetAllPost.append(sectionGetAllPosts);
  subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPost);
  section.append(subSection, nav);

  return section;
};

// export default feed;
