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

  return sectionGetAllPosts;
};

// export default formatGetAllPosts;
