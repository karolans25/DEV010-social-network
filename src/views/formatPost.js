import {
  onSnapshot, query, collection, where, orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AuthService from '../firebase/authService';
import { popup } from './popup';
import { feedHandler } from '../handlers/feedHandler';
import { formatCreateComment } from './formatCreateComment';
import { formatComment } from './formatComment';

import imgLike from '../assets/icons/voto-positivo.png';
import imgDislike from '../assets/icons/voto-negativo.png';
import imgLove from '../assets/icons/salud-mental.png';
import imgBest from '../assets/icons/calidad-premium.png';
import imgDoubts from '../assets/icons/investigar.png';
import imgComment from '../assets/icons/comentario.png';
import imgLoading from '../assets/icons/playground.gif';

const createCloseButton = (container) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  closeButton.style.width = '25px';
  closeButton.style.height = '25px';
  closeButton.style.background = 'var(--main-color)';
  closeButton.style.borderRadius = '50%';
  closeButton.style.color = 'black';
  closeButton.style.fontWeight = 'bold';
  closeButton.style.textAlign = 'center';
  closeButton.style.cursor = 'pointer';
  const userName = container.querySelector('.user-name');
  // const headLine = container.querySelector('.head-line');
  // headLine.style.display = 'grid';
  // headLine.style.gridTemplateColumns = '1fr 2fr 6fr';
  userName.before(closeButton);
  userName.parentNode.style.display = 'flex';
};

const fillPostData = (urls, container) => {
  if (Array.isArray(urls)) {
    if (urls.length === 0) {
      container.style.display = 'none';
    } else {
      container.style.display = 'grid';
    }
    urls.forEach((url) => {
      const img = document.createElement('img');
      img.className = 'post-img';
      img.src = url;
      img.alt = 'img post';
      container.appendChild(img);
    });
  }
};

export const formatPost = async (item) => {
  const principalSection = document.createElement('section');
  const sectionFormatPost = document.createElement('section');
  const sectionUserData = document.createElement('section');
  const sectionName = document.createElement('section');
  const userName = document.createElement('p');
  const userFigure = document.createElement('figure');
  const userImg = document.createElement('img');
  const sectionPostData = document.createElement('section');
  const createdAt = document.createElement('p');
  const postText = document.createElement('p');
  const postFigureContainer = document.createElement('figure');
  const sectionReact = document.createElement('section');
  const sectionComment = document.createElement('section');
  const sectionButtons = document.createElement('section');
  const reactionMessage = document.createElement('p');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  const reactIcons = ['Like', 'Dislike', 'Love it', 'The best', 'Make me doubt', 'Comment'];
  if (item.createdAt) {
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
    createdAt.textContent = stringDate;
  }

  sectionFormatPost.classList.add('container-found-post');
  sectionUserData.className = 'data-user';
  userName.className = 'user-name';
  userImg.className = 'user-img';
  userFigure.className = 'user-figure';
  sectionPostData.className = 'data-post';
  createdAt.classList.add('created-timestamp', item.id);
  postText.className = 'post-text';
  postFigureContainer.classList.add('post-figure', item.id);
  sectionReact.className = 'post-react';
  sectionComment.classList.add('post-react', 'comment');
  sectionButtons.className = 'post-buttons';
  reactionMessage.className = 'reaction-message';

  reactionMessage.style.display = 'none';
  postText.textContent = item.text;
  userImg.alt = 'user img';

  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  feedHandler.getUserDataById(item.idUser)
    .then((dataUser) => {
      userName.textContent = dataUser.name;
      userImg.src = dataUser.photo;
    });

  /** Add the images of the post */
  fillPostData(item.URL, postFigureContainer);

  /** Create buttons section */
  for (let iterator = 0; iterator < reactIcons.length; iterator++) {
    const button = document.createElement('button');
    const img = document.createElement('img');
    if (iterator === 0) img.src = imgLike;
    if (iterator === 1) img.src = imgDislike;
    if (iterator === 2) img.src = imgLove;
    if (iterator === 3) img.src = imgBest;
    if (iterator === 4) img.src = imgDoubts;
    if (iterator === 5) img.src = imgComment;
    // img.src = reactIcons[iterator][0];
    img.alt = `${iterator + 1}`;
    img.classList.add('react-button', `${iterator + 1}`, item.id);
    button.classList.add('button', `${iterator + 1}`, item.id);
    button.setAttribute('data-type', iterator + 1);
    button.appendChild(img);
    if (iterator === reactIcons.length - 1) {
      sectionComment.appendChild(button);
    } else {
      sectionReact.appendChild(button);
    }
  }

  const likesPost = await feedHandler.getReactionsOfPost(item.id);
  console.log(likesPost);
  // const typeLikes = [0, 0, 0, 0, 0, 0];
  // for (let i = 0; i < likesPost.length; i++) {
  //   const pos = parseInt(likesPost[i].idTypeLike, 10) - 1;
  //   typeLikes[pos] += 1;
  // }

  /** Add messages for existent reactions */
  const id = AuthService.getCurrentUser().uid;
  const que2 = query(collection(db, 'like'), where('idPost', '==', `${item.id}`));
  onSnapshot(que2, (reactionSnapshot) => {
    const likes = [];
    reactionSnapshot.docs.forEach((document) => {
      likes.push({ ...document.data(), id: document.id });
    });
    likes.forEach(async (like) => {
      console.log(item.id);
      console.log(like.idTypeLike);
      console.log();
      if (like.idUser === id) {
        const reaction = await feedHandler.getReactionMessage(like.idTypeLike);
        if (reaction) reactionMessage.style.display = 'block';
        reactionMessage.textContent = reaction.message;
      }
    });
  });

  /** Event listener for reaction buttons */
  sectionReact.addEventListener('click', async (e) => {
    try {
      loadingContainer.style.display = 'block';
      const [, type, idPost] = e.target.classList;
      const reactedSnapshot = await feedHandler.hasReactedPost(idPost);
      if (reactedSnapshot.size > 0) {
        if (type === reactedSnapshot.docs[0].data().idTypeLike) {
          feedHandler.unreactPost(reactedSnapshot.docs[0].id);
          reactionMessage.style.display = 'none';
        } else {
          feedHandler.updateReactPost(reactedSnapshot.docs[0].id, type);
          const reaction = await feedHandler.getReactionMessage(type);
          reactionMessage.textContent = reaction.message;
        }
      } else {
        feedHandler.reactPost(idPost, type);
        reactionMessage.style.display = 'block';
        const reaction = await feedHandler.getReactionMessage(type);
        reactionMessage.textContent = reaction.message;
      }
      loadingContainer.style.display = 'none';
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  /** Event listener for comments */
  const createComment = formatCreateComment(item.id);
  // let commentText = document.createElement('section');
  const container = document.createElement('section');
  container.classList.add('container-comments');
  sectionComment.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';
    if (createComment.style.display === 'grid') {
      createComment.style.display = 'none';
      sectionFormatPost.after(createComment);
      // container.style.display = 'none';
      principalSection.removeChild(container);
    } else {
      createComment.style.display = 'grid';
      sectionFormatPost.after(createComment);
      container.style.display = 'grid';

      const que3 = query(collection(db, 'comment'), orderBy('createdAt', 'desc'));
      onSnapshot(que3, (commentSnapshot) => {
        container.innerHTML = '';
        const comments = [];
        commentSnapshot.docs.forEach((element) => {
          if (element.data().idPost === item.id) {
            comments.push({ ...element.data(), id: element.id });
          }
        });
        // const max = comments.length;
        comments.forEach((element) => {
          const temp = formatComment(element);
          container.append(temp);
          if (element.idUser === id) {
            createCloseButton(temp);
          }
        });
      });
      principalSection.append(container);
    }
  });

  container.addEventListener('click', (e) => {
    e.preventDefault();
    // container-found-comment <= head-line <= aside <= e.target
    const parentParent = e.target.parentNode.parentNode.parentNode;
    const idComment = parentParent.getAttribute('data-id');
    parentParent.parentNode.removeChild(parentParent);
    feedHandler.deleteComment(idComment);
  });

  /** Append y append childs for sections */
  userFigure.append(userImg);
  sectionName.appendChild(userName);
  sectionUserData.append(sectionName, userFigure);
  sectionReact.appendChild(reactionMessage);
  sectionButtons.appendChild(sectionReact);
  sectionButtons.appendChild(sectionComment);
  sectionPostData.append(createdAt, postText, postFigureContainer);
  sectionPostData.append(sectionButtons, reactionMessage);
  sectionFormatPost.append(sectionUserData, sectionPostData);
  principalSection.append(sectionFormatPost);
  loadingContainer.append(loadingGif);
  principalSection.append(loadingContainer);

  return principalSection;
};
