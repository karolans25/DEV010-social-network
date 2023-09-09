import {
  query, collection, orderBy, onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { formatPost } from './formatPost';
import { navbar } from './navbar';
import { popup } from './popup';
import { TITLE } from '../consts/const';
import { searchHandler } from '../handlers/searchHandler';

export const search = (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  const sectionSearch = document.createElement('section');
  const subtitle = document.createElement('h2');
  const searchText = document.createElement('input');
  const sectionGetAllPosts = document.createElement('section');

  section.classList.value = 'home';
  subSection.className = 'feed';
  sectionGetAllPosts.className = 'get-posts';
  subtitle.style.marginTop = '20px';
  title.innerHTML = TITLE;
  title.style.marginTop = '10px';
  sectionSearch.className = 'search-user';
  subtitle.textContent = 'Search user:';
  subtitle.style.fontSize = '25px';
  searchText.type = 'text';
  searchText.className = 'post-text';
  searchText.placeholder = 'Search the user';

  searchText.addEventListener('keyup', async (e) => {
    try {
      e.preventDefault();
      console.log(searchText.value);
      const users = await searchHandler.getAllUsers();
      console.log(users);
    } catch (err) { popup(err.message); }
  });

  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((documentPost) => {
      posts.push({ ...documentPost.data(), id: documentPost.id });
    });
    sectionGetAllPosts.innerHTML = '';
    if (posts.length === 0) {
      popup('You don\'t have any post yet');
      const text = document.createElement('h2');
      text.innerHTML = '😓 There\'s no post yet!<br>This is your chance to start 😎🥳';
      sectionGetAllPosts.appendChild(text);
    }
    posts.forEach(async (item) => {
      const formatForEachPost = await formatPost(item);
      formatForEachPost.classList.add('show-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
    });
  });

  sectionSearch.appendChild(subtitle);
  sectionSearch.appendChild(searchText);
  subSection.append(sectionSearch, title, sectionGetAllPosts);
  section.append(subSection, nav);

  return section;
};
