import {
  onSnapshot, query, collection, where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import AuthService from '../firebase/authService';
import { popup } from './popup';
import { feedHandler } from '../handlers/feedHandler';
import { formatCreateComment } from './formatCreateComment';

import imgLike from '../assets/icons/voto-positivo.png';
import imgDislike from '../assets/icons/voto-negativo.png';
import imgLove from '../assets/icons/salud-mental.png';
import imgBest from '../assets/icons/calidad-premium.png';
import imgDoubts from '../assets/icons/investigar.png';
import imgComment from '../assets/icons/comentario.png';
import imgLoading from '../assets/icons/playground.gif';
import { formatComment } from './formatComment';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

const createThumbnail = (file, id, container) => {
  const thumbnail = document.createElement('figure');
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;
  if (file instanceof File) {
    thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file)})`);
  } else {
    thumbnail.setAttribute('style', `background-image: url(${file})`);
  }
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
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

  const dataUser = await feedHandler.getUserDataById(item.idUser);
  userName.textContent = dataUser.name;
  userImg.src = dataUser.photo;

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

  /** Add messages for existent reactions */
  const id = AuthService.getCurrentUser().uid;
  const que2 = query(collection(db, 'like'), where('idPost', '==', `${item.id}`));
  onSnapshot(que2, (reactionSnapshot) => {
    const likes = [];
    reactionSnapshot.docs.forEach((document) => {
      likes.push({ ...document.data(), id: document.id });
    });
    likes.forEach((like) => {
      if (like.idUser === id) {
        feedHandler.getReactionMessage(like.idTypeLike).then((reaction) => {
          if (reaction) reactionMessage.style.display = 'block';
          reactionMessage.textContent = reaction.message;
        });
      }
    });
  });

  /** Event listener for reaction buttons */
  sectionReact.addEventListener('click', (e) => {
    try {
      loadingContainer.style.display = 'block';
      const [, type, idPost] = e.target.classList;
      feedHandler.hasReactedPost(idPost)
        .then((reactedSnapshot) => {
          if (reactedSnapshot.size > 0) {
            if (type === reactedSnapshot.docs[0].data().idTypeLike) {
              feedHandler.unreactPost(reactedSnapshot.docs[0].id);
              reactionMessage.style.display = 'none';
            } else {
              feedHandler.updateReactPost(reactedSnapshot.docs[0].id, type);
              feedHandler.getReactionMessage(type).then((reaction) => {
                reactionMessage.textContent = reaction.message;
              });
            }
          } else {
            feedHandler.reactPost(idPost, type);
            reactionMessage.style.display = 'block';
            feedHandler.getReactionMessage(type).then((reaction) => {
              reactionMessage.textContent = reaction.message;
            });
          }
        });
      loadingContainer.style.display = 'none';
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  /** Event listener for comments */
  const createComment = formatCreateComment(item.id);
  sectionComment.addEventListener('click', (e) => {
    e.preventDefault();
    if (createComment.style.display === 'grid') {
      createComment.style.display = 'none';
    } else {
      createComment.style.display = 'grid';
    }
    principalSection.append(createComment);
    const que3 = query(collection(db, 'comment'), where('idPost', '==', `${item.id}`));
    onSnapshot(que3, (reactionSnapshot) => {
      const comments = [];
      reactionSnapshot.docs.forEach((document) => {
        comments.push({ ...document.data(), id: document.id });
      });
      comments.forEach(async (comment) => {
        console.log(comment);
        const commentText = await formatComment(comment);
        principalSection.append(commentText);
      });
    });
  });

  /** Append y append childs for sections */
  userFigure.append(userImg);
  sectionUserData.append(userName, userFigure);
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
