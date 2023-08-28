import {
  onSnapshot, getDoc, doc, query, collection, where,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebaseConfig';
import popup from './popup';
import {
  reactPost, unreactPost, updateReactPost, hasReactedPost,
  getReactionMessage, getUserReactions, getMyReactionPost,
} from '../lib/user';

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
      const formatPost = document.createElement('section');
      const sectionUserData = document.createElement('section');
      const userName = document.createElement('p');
      const userFigure = document.createElement('figure');
      const userImg = document.createElement('img');
      const sectionPostData = document.createElement('section');
      const createdAt = document.createElement('p');
      const postText = document.createElement('p');
      const postFigureContainer = document.createElement('section');
      const sectionReact = document.createElement('section');
      const sectionComment = document.createElement('section');
      const sectionButtons = document.createElement('section');
      const reactionMessage = document.createElement('p');

      const reactIcons = [
        ['../assets/icons/voto-positivo.png', 'Like'],
        ['../assets/icons/voto-negativo.png', 'Dislike'],
        ['../assets/icons/salud-mental.png', 'Love it'],
        ['../assets/icons/calidad-premium.png', 'The best'],
        ['../assets/icons/investigar.png', 'Make me doubt'],
        ['../assets/icons/comentario.png', 'Comment'],
      ];
      const date = item.createdAt.toDate();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };
      const stringDate = date.toLocaleString('en-US', options);

      formatPost.className = 'container-found-post';
      sectionUserData.className = 'data-user';
      userName.className = 'user-name';
      userImg.className = 'user-img';
      userFigure.className = 'user-figure';
      sectionPostData.className = 'data-post';
      createdAt.className = 'created-timestamp';
      postText.className = 'post-text';
      postFigureContainer.className = 'post-figure';
      sectionReact.className = 'post-react';
      sectionComment.classList.add('post-react', 'comment');
      sectionButtons.className = 'post-buttons';
      reactionMessage.className = 'reaction-message';
      reactionMessage.style.display = 'none';
      postText.textContent = item.text;

      getDoc(doc(db, 'user', item.idUser))
        .then((documentUser) => {
          userName.textContent = documentUser.data().name;
          userImg.src = documentUser.data().photo;
        }).catch((err) => popup(err.message));
      userImg.alt = 'user img';
      createdAt.textContent = stringDate;

      if (Array.isArray(item.URL)) {
        if (!item.URL[0]) {
          postFigureContainer.style.display = 'none';
        } else {
          postFigureContainer.style.display = 'grid';
        }
        item.URL.forEach((url) => {
          const img = document.createElement('img');
          img.className = 'post-img';
          img.src = url;
          img.alt = 'img post';
          postFigureContainer.appendChild(img);
        });
      }

      const max = reactIcons.length;
      for (let iterator = 0; iterator < max; iterator++) {
        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = reactIcons[iterator][0];
        img.alt = `${iterator + 1}`;
        img.classList.add('react-button', `${iterator + 1}`, item.id);
        button.classList.add('button', `${iterator + 1}`, item.id);
        button.setAttribute('data-type', iterator + 1);
        button.appendChild(img);
        if (iterator === max - 1) {
          sectionComment.appendChild(button);
        } else {
          sectionReact.appendChild(button);
        }
      }

      sectionReact.addEventListener('click', (e) => {
        const [, type, idPub] = e.target.classList;
        hasReactedPost(idPub)
          .then((reactedSnapshot) => {
            if (reactedSnapshot.size > 0) {
              if (type === reactedSnapshot.docs[0].data().idTypeLike) {
                unreactPost(reactedSnapshot.docs[0].id);
                reactionMessage.style.display = 'none';
              } else {
                updateReactPost(type, reactedSnapshot.docs[0].id);
                getReactionMessage(type).then((data) => {
                  reactionMessage.textContent = data.message;
                });
              }
            } else {
              reactPost(idPub, type);
              reactionMessage.style.display = 'block';
              getReactionMessage(type).then((data) => {
                reactionMessage.textContent = data.message;
              });
            }
          });
      });

      const que = query(collection(db, 'like'), where('idPost', '==', `${item.id}`, where('idUser', '==', auth.currentUser.uid)));
      onSnapshot(que, (myReactionSnapshot) => {
        const likes = [];
        myReactionSnapshot.docs.forEach((document) => {
          likes.push({ ...document.data(), id: document.id });
        });
        likes.forEach((like) => {
          getReactionMessage(like.idTypeLike).then((data) => {
            if (data) reactionMessage.style.display = 'block';
            reactionMessage.textContent = data.message;
          });
        });
      });

      sectionComment.addEventListener('click', (e) => {
        console.log(e.target.classList);
      });
      // postFigureContainer.src = item.URL;
      // postFigureContainer.alt = 'post img';

      userFigure.append(userImg);
      sectionUserData.append(userName, userFigure);
      sectionReact.appendChild(reactionMessage);
      sectionButtons.appendChild(sectionReact);
      sectionButtons.appendChild(sectionComment);
      // eslint-disable-next-line max-len
      sectionPostData.append(createdAt, postText, postFigureContainer, sectionButtons, reactionMessage);
      formatPost.append(sectionUserData, sectionPostData);
      sectionGetAllPosts.append(formatPost);
    });
  });

  return sectionGetAllPosts;
}

export default formatGetAllPosts;
