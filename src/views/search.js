import { formatPost } from './formatPost';
import { header } from './header';
import { navbar } from './navbar';
import { searchHandler } from '../handlers/searchHandler';
import { feedHandler } from '../handlers/feedHandler';

export const search = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const head = await header(navigateTo);
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  // const sectionSearch = document.createElement('section');
  const subtitle = document.createElement('h2');
  const searchText = document.createElement('input');
  const sectionGetAllPosts = document.createElement('section');

  section.classList.value = 'home';
  subSection.className = 'feed';
  sectionGetAllPosts.className = 'get-posts';
  subtitle.style.marginTop = '20px';
  title.innerHTML = 'Results';
  title.style.marginTop = '10px';
  // sectionSearch.className = 'search-user';
  subtitle.textContent = 'Search user:';
  subtitle.style.fontSize = '25px';
  searchText.type = 'text';
  searchText.className = 'post-text';
  searchText.placeholder = 'Search the user';

  let ids = [];
  let users = [];
  let posts = [];
  searchHandler.getAllUsers()
    .then((theUsers) => {
      theUsers.forEach((user) => {
        ids.push(user.id);
        users.push(user);
      });
    })
    .then(async () => {
      posts = await feedHandler.getAllPost();
      if (posts.length === 0) {
        // popup('The user doesn\'t exist! 😓');
        const text = document.createElement('h2');
        text.innerHTML = 'The user doesn\'t exist! 😓';
        sectionGetAllPosts.appendChild(text);
      }
      sectionGetAllPosts.innerHTML = '';
      posts.forEach((item) => {
        if (ids.includes(item.idUser)) {
          const formatForEachPost = formatPost(item);
          formatForEachPost.classList.add('show-post', item.id);
          console.log(formatForEachPost);
          sectionGetAllPosts.append(formatForEachPost);
        }
      });
    })
    .then(() => {
      searchText.addEventListener('keyup', async (e) => {
        e.preventDefault();
        ids = [];
        users = await searchHandler.getAllUsers();
        users.forEach((itemUser) => {
          const searchName = itemUser.name.toLowerCase();
          const searchEmail = itemUser.email.toLowerCase();
          const searchArea = searchText.value.toLowerCase();
          if (searchName.includes(searchArea) || searchEmail.includes(searchArea)) {
            ids.push(itemUser.id);
          }
        });
        sectionGetAllPosts.innerHTML = '';
        posts.forEach((item) => {
          if (ids.includes(item.idUser)) {
            const formatForEachPost = formatPost(item);
            formatForEachPost.classList.add('show-post', item.id);
            console.log(formatForEachPost);
            sectionGetAllPosts.append(formatForEachPost);
          }
        });
        console.log('ids: ', ids);
      });
    });
  // const users = await searchHandler.getAllUsers();
  // users.forEach((itemUser) => {
  //   ids.push(itemUser.id);
  // });
  // console.log(ids);

  // const posts = await feedHandler.getAllPost();
  // if (posts.length === 0) {
  //   // popup('The user doesn\'t exist! 😓');
  //   const text = document.createElement('h2');
  //   text.innerHTML = 'The user doesn\'t exist! 😓';
  //   sectionGetAllPosts.appendChild(text);
  // }
  // sectionGetAllPosts.innerHTML = '';
  // posts.forEach((item) => {
  //   if (ids.includes(item.idUser)) {
  //     const formatForEachPost = formatPost(item);
  //     formatForEachPost.classList.add('show-post', item.id);
  //     console.log(formatForEachPost);
  //     sectionGetAllPosts.append(formatForEachPost);
  //   }
  // });

  // searchText.addEventListener('keyup', async (e) => {
  //   e.preventDefault();
  //   ids = [];
  //   users = await searchHandler.getAllUsers();
  //   users.forEach((itemUser) => {
  //     const searchName = itemUser.name.toLowerCase();
  //     const searchEmail = itemUser.email.toLowerCase();
  //     const searchArea = searchText.value.toLowerCase();
  //     if (searchName.includes(searchArea) || searchEmail.includes(searchArea)) {
  //       ids.push(itemUser.id);
  //     }
  //   });
  //   sectionGetAllPosts.innerHTML = '';
  //   posts.forEach((item) => {
  //     if (ids.includes(item.idUser)) {
  //       const formatForEachPost = formatPost(item);
  //       formatForEachPost.classList.add('show-post', item.id);
  //       console.log(formatForEachPost);
  //       sectionGetAllPosts.append(formatForEachPost);
  //     }
  //   });
  //     console.log('ids: ', ids);
  // });

  // sectionSearch.appendChild(subtitle);
  // sectionSearch.appendChild(searchText);
  // subSection.append(sectionSearch, title, sectionGetAllPosts);
  subSection.append(subtitle, searchText, title, sectionGetAllPosts);
  section.append(head, subSection, nav);

  return section;
};
