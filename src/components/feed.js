import {
  serverTimestamp,
  collection, doc, setDoc,
  onSnapshot,
  addDoc,
  updateDoc,
  query,
  orderBy,
  getDoc,
  // getDocs, deleteDoc, query, where, orderBy, 
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { auth, db } from '../lib/firebaseConfig';
import { navBar } from './navBar';
import { createPost, getAllPosts } from '../lib/user';
import popup from './popup';

function feed(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  const sectionCreatePost = document.createElement('section');
  const sectionTitle = document.createElement('section');
  const sectionPost = document.createElement('section');
  const sectionButton = document.createElement('section');
  const userName = document.createElement('h2');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const form = document.createElement('form');
  const postText = document.createElement('textarea');
  const postImg = document.createElement('img');
  const buttonAddImg = document.createElement('input');
  const buttonDeleteImage = document.createElement('button');
  const buttonPublish = document.createElement('input');

  const title = document.createElement('h1');
  const sectionGetAllPosts = document.createElement('section');
  // const sectionPost = document.createElement('section');
  // const sectionButton = document.createElement('section');
  // const userName = document.createElement('h2');
  // const figure = document.createElement('figure');
  // const img = document.createElement('img');
  // const form = document.createElement('form');
  // const postText = document.createElement('textarea');
  // const postImg = document.createElement('img');
  // const buttonAddImg = document.createElement('input');
  // const buttonDeleteImage = document.createElement('button');
  // const buttonPublish = document.createElement('input');

  section.classList.value = 'home';
  subSection.className = 'feed';

  /* Add a Post */
  sectionCreatePost.className = 'create-post';
  sectionTitle.className = 'header-post';
  sectionPost.className = 'body-post';
  sectionButton.className = 'foot-post';

  const user = auth.currentUser;
  userName.innerHTML = user.displayName;
  // userName.innerHTML = 'Carolina Pulido';
  img.src = user.photoURL;

  postText.placeholder = 'What do you want to say?';
  buttonAddImg.type = 'file';
  buttonAddImg.setAttribute('accept', 'image/*');
  buttonAddImg.addEventListener('change', (e) => {
    postImg.src = URL.createObjectURL(e.target.files[0]);
    buttonAddImg.style.display = 'none';
    buttonDeleteImage.style.display = 'block';
  });
  buttonDeleteImage.textContent = 'Delete image';
  buttonDeleteImage.style.display = 'none';
  buttonDeleteImage.addEventListener('click', () => {
    // postImg.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
    postImg.src = '';
    postImg.atl = '';
    buttonAddImg.style.display = 'block';
    buttonDeleteImage.style.display = 'none';
  });
  buttonPublish.type = 'submit';
  buttonPublish.textContent = 'Publish';
  form.addEventListener('submit', (e) => {
    try {
      e.preventDefault();
      console.log(postImg.src);
      console.log(postText.value);
      if (postImg.src !== '') {
        fetch(postImg.src).then((res) => res.blob()).then((blob) => {
          createPost(postText.value, blob)
            .then((response) => {
              if (response.includes('The post has been created')) {
                popup(response);
                form.reset();
              }
            })
            .catch((err) => { popup(err.message); });
        });
      } else {
        createPost(postText.value)
          .then((response) => {
            if (response.includes('The post has been created')) {
              popup(response);
              form.reset();
            }
          })
          .catch((err) => { popup(err.message); });
      }
    } catch (err) { popup(err.message); }
  });

  sectionCreatePost.style.background = 'transparent';
  sectionCreatePost.style.height = '340px';
  // sectionTitle.style.background = 'transparent';
  // sectionPost.style.background = 'transparent';
  // sectionButton.style.background = 'transparent';
  form.style.background = 'var(--contrast-color)';
  form.style.background = 'transparent';
  form.style.boxShadow = '0.5rem 0.5rem var(--moving-things-color)';
  form.style.borderRadius = '15px';
  sectionButton.style.height = '70px';
  sectionCreatePost.style.background = 'var(--contrast-color)';
  sectionCreatePost.style.background = 'transparent';
  sectionPost.style.width = '100%';
  sectionPost.style.maxHeight = '200px';
  img.style.width = '60px';
  img.style.height = '60px';
  img.style.borderRadius = '50%';
  figure.style.width = '60px';
  figure.style.height = '60px';
  postText.style.width = '235px';
  postText.style.height = '100px';
  postText.style.padding = '10px 10px 10px 10px';
  // postImg.style.background = 'transparent';
  postImg.style.width = '100px';
  postImg.style.height = '100px';
  sectionTitle.style.height = '70px';
  sectionPost.style.display = 'flex';
  sectionPost.style.flexFlow = 'row wrap';

  /* See all the created Post */
  title.innerHTML = 'TITLE';
  sectionGetAllPosts.className = 'get-all-posts';
  // const posts = () => getAllPosts();
  // console.log(posts);
  // console.log(getAllPosts());
  const q = query(collection(db, 'post'), orderBy('createdAt', 'desc'));
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
      formatPost.style.height = '300px';
      formatPost.style.display = 'grid';
      formatPost.style.gridTemplateColumns = '2fr 4fr;';
      formatPost.style.border = 'solid 2px var(--main-color)';

      figureUser.append(imgUser);
      sectionUserData.append(pName, figureUser, pCreatedAt);
      sectionPostData.append(textPost, imgPost);
      formatPost.append(sectionUserData, sectionPostData);
      sectionGetAllPosts.append(formatPost);
    });
  });

  /*
      const sectionPostFound = document.createElement('section');
      const pPostText = document.createElement('p');
      const imgPost = document.createElement('img');
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
  figure.append(img);
  sectionTitle.append(figure, userName);
  sectionPost.append(postText, postImg, buttonAddImg, buttonDeleteImage);
  form.append(sectionTitle, sectionPost, buttonPublish);
  sectionCreatePost.append(form);
  // sectionGetAllPosts.append(formatPost);
  subSection.append(sectionCreatePost, title, sectionGetAllPosts);
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
