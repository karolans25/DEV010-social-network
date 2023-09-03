// import { onSnapshot } from 'firebase/firestore';
import { formatPost } from './formatPost';
import { feedHandler } from '../handlers/feedHandler';

export const formatGetAllPosts = async () => {
  const sectionGetAllPosts = document.createElement('section');

  sectionGetAllPosts.className = 'get-posts';
  sectionGetAllPosts.innerHTML = '';

  const posts = await feedHandler.getAllPost();
  posts.forEach(async (item) => {
    const formatForEachPost = await formatPost(item);
    formatForEachPost.classList.add('container-found-post', item.id);
    sectionGetAllPosts.append(formatForEachPost);
  });

  //   sectionGetAllPosts.className = 'get-posts';

  //   onSnapshot(q, (snapshot) => {
  //     const posts = [];
  //     snapshot.docs.forEach((documentPost) => {
  //       posts.push({ ...documentPost.data(), id: documentPost.id });
  //     });
  //     sectionGetAllPosts.innerHTML = '';
  //     posts.forEach((item) => {
  //       const formatForEachPost = formatPost(item);
  //       formatForEachPost.classList.add('container-found-post', item.id);
  //       sectionGetAllPosts.append(formatForEachPost);
  //     });
  //   });

  return sectionGetAllPosts;
};

// export default formatGetAllPosts;
