import { onSnapshot } from 'firebase/firestore';
import { formatPost } from './formatPost';

function formatGetAllPosts(q) {
  const sectionGetAllPosts = document.createElement('section');
  sectionGetAllPosts.className = 'get-posts';

  onSnapshot(q, (snapshot) => {
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
  });

  return sectionGetAllPosts;
}

export default formatGetAllPosts;
