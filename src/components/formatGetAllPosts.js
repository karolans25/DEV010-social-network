import { onSnapshot, getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import popup from './popup';

function formatGetAllPosts(q) {
  const sectionGetAllPosts = document.createElement('section');
  onSnapshot(q, (snapshot) => {
    const posts = [];
    snapshot.docs.forEach((documentPost) => {
      posts.push({ ...documentPost.data(), id: documentPost.id });
    });
    sectionGetAllPosts.innerHTML = '';
    posts.forEach((item) => {
      const formatPost = document.createElement('section');
      const sectionUserData = document.createElement('section');
      const pName = document.createElement('p');
      const figureUser = document.createElement('figure');
      const imgUser = document.createElement('img');
      const pCreatedAt = document.createElement('p');
      const sectionPostData = document.createElement('section');
      const textPost = document.createElement('p');
      const imgPost = document.createElement('img');

      formatPost.className = 'container-found-post';
      sectionUserData.className = 'data-user';

      getDoc(doc(db, 'user', item.idUser))
        .then((documentUser) => {
          pName.textContent = documentUser.data().name;
          imgUser.src = documentUser.data().photo;
        }).catch((err) => popup(err.message));
      imgUser.alt = 'user img';
      const date = item.createdAt.toDate();
      const stringDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      pCreatedAt.textContent = stringDate;

      textPost.textContent = item.text;
      console.log(item.URL);
      imgPost.src = item.URL;
      imgPost.alt = 'post img';

      pName.style.height = '40px';
      pCreatedAt.style.height = '40px';
      imgUser.style.width = '60px';
      imgUser.style.height = '60px';
      imgUser.style.borderRadius = '50%';
      figureUser.style.width = '60px';
      figureUser.style.height = '60px';
      sectionUserData.style.height = '100px';
      sectionUserData.style.height = '200px';
      sectionPostData.style.width = '200px';
      sectionPostData.style.height = '200px';
      formatPost.style.width = '500px';
      formatPost.style.height = 'fit-content';
      formatPost.style.padding = '15px 15px 15px 15px';
      formatPost.style.display = 'grid';
      textPost.style.height = 'fit-content';
      formatPost.style.gridTemplateColumns = '2fr 3fr';
      formatPost.style.border = 'solid 2px var(--main-color)';

      figureUser.append(imgUser);
      sectionUserData.append(pName, figureUser, pCreatedAt);
      sectionPostData.append(textPost, imgPost);
      formatPost.append(sectionUserData, sectionPostData);
      sectionGetAllPosts.append(formatPost);
    });
  });

  return sectionGetAllPosts;
}

export default formatGetAllPosts;
