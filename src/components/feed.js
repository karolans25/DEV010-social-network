import {
  collection,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { navBar } from './navBar';
import formatCreatePost from './formatCreatePost';
import formatGetAllPosts from './formatGetAllPosts';

function feed(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar(navigateTo);

  section.classList.value = 'home';
  subSection.className = 'feed';

  const sectionFormatCreatePost = formatCreatePost();
  // const sectionFormatCreatePost = document.createElement('section');
  const title = document.createElement('h1');
  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
  const sectionFormatGetAllPost = formatGetAllPosts(q);

  title.innerHTML = 'TITLE';
  /*
      const likeZone = document.createElement('section');
      const buttonLike = document.createElement('button');
      const buttonDislike = document.createElement('button');
      const buttonLoveIt = document.createElement('button');
      const buttonTheBest = document.createElement('button');
      const buttonDoubts = document.createElement('button');
      const buttonComment = document.createElement('button');

      pName.innerHTML = auth.currentUser.displayName;
      img.src = auth.currentUser.photoURL;
      img.alt = 'user photo';
      pCreatedAt.innerHTML = document.createElement('p');
      pPostText.innerHTML = documentPost.text;
      imgPost.src = documentPost.URL;
      buttonLike.addEventListener('click', (e) => {
        console.log('Like');
      });
      buttonDislike.addEventListener('click', (e) => {
        console.log('Dislike');
      });
      buttonLoveIt.addEventListener('click', (e) => {
        console.log('Love it');
      });
      buttonTheBest.addEventListener('click', (e) => {
        console.log('The best');
      });
      buttonDoubts.addEventListener('click', (e) => {
        console.log('Make questions');
      });
      buttonComment.addEventListener('click', (e) => {
        console.log('Comment');
      });

      figureUser.append(imgUser);
      sectionUserData.append(pName, figureUser, pCreatedAt);
      // eslint-disable-next-line max-len
      likeZone.append(buttonLike, buttonDislike, buttonLoveIt, buttonTheBest, buttonDoubts, buttonComment);
      sectionPostFound.append(pPostText, imgPost, likeZone);
      sectionPostFound.style.border = 'solid 3px var(--principal-letter-color)';
      formatPost.append(sectionPostFound);
      // });
    });
  });
  */
  subSection.append(sectionFormatCreatePost, title, sectionFormatGetAllPost);
  section.append(subSection, nav);

  // const list = document.getElementsByClassName('list');
  // for (let i = 0; i < list.length; i++) {
  //   list[i].classList.remove('active');
  //   if (list[i].id === 'list-feed') {
  //     list[i].classList.add('active');
  //   }
  // }

  return section;
}

export default feed;
