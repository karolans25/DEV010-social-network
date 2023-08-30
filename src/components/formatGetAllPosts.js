import { onSnapshot } from 'firebase/firestore';
import { formatPost } from './formatPost';

function formatGetAllPosts(q) {
  const sectionGetAllPosts = document.createElement('section');
  const sectionPreload = document.createElement('section'); // preload
  const preloadGif = document.createElement('img');
  sectionGetAllPosts.className = 'get-posts';
  sectionPreload.className = 'preload';
  preloadGif.className = 'preload-gif';
  preloadGif.src = './assets/icons/playground.gif';
  preloadGif.alt = 'preload';
  sectionPreload.appendChild(preloadGif);

  onSnapshot(q, (snapshot) => {
    sectionPreload.classList.add('activate-preload');
    const posts = [];
    snapshot.docs.forEach((documentPost) => {
      posts.push({ ...documentPost.data(), id: documentPost.id });
    });
    sectionGetAllPosts.innerHTML = '';
    posts.forEach((item) => {
      const formatForEachPost = formatPost(item);
      formatForEachPost.classList.add('container-found-post', item.id);
      sectionGetAllPosts.append(formatForEachPost);
    });
    sectionPreload.classList.remove('activate-preload');
  });

  return sectionGetAllPosts;
}

export default formatGetAllPosts;
