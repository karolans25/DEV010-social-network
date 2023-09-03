import { navbar } from './navbar';
import { formatCreatePost } from './formatCreatePost';
import { formatPost } from './formatPost';
import { feedHandler } from '../handlers/feedHandler';

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
  sectionGetAllPosts.innerHTML = '';
  title.innerHTML = 'Caro PG';

  const posts = await feedHandler.getAllPost();
  posts.forEach(async (item) => {
    const formatForEachPost = await formatPost(item);
    formatForEachPost.classList.add('container-found-post', item.id);
    sectionGetAllPosts.append(formatForEachPost);
  });

  sectionFormatGetAllPost.append(sectionGetAllPosts);
  subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPost);
  section.append(subSection, nav);

  return section;
};

// export default feed;
