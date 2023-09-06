import {
  onSnapshot, query, collection, where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { popup } from './popup';
// import {
//   reactPost, unreactPost, updateReactPost, hasReactedPost, deletePost,
//   updatePost, getReactionMessage,
// } from '../lib/user';

import { feedHandler } from '../handlers/feedHandler';
import AuthService from '../firebase/authService';
import { REACT_ICONS } from '../consts/consts';

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

export const formatPost = (item) => {
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
  loadingGif.src = '../assets/icons/playground.gif';
  loadingGif.alt = 'loading';

  feedHandler.getUserDataById(item.idUser)
    .then((data) => {
      userName.textContent = data[0];
      userImg.src = data[1];
    });
  //   getDoc(doc(db, 'user', item.idUser))
  //     .then((documentUser) => {
  //       userName.textContent = documentUser.data().name;
  //       userImg.src = documentUser.data().photo;
  //     }).catch((err) => popup(err.message));

  /** Add the images of the post */
  fillPostData(item.URL, postFigureContainer);

  /** Create buttons section */
  for (let iterator = 0; iterator < REACT_ICONS.length; iterator++) {
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = REACT_ICONS[iterator].path;
    img.alt = `${iterator + 1}`;
    img.classList.add('react-button', `${iterator + 1}`, item.id);
    button.classList.add('button', `${iterator + 1}`, item.id);
    button.setAttribute('data-type', iterator + 1);
    button.appendChild(img);
    if (iterator === REACT_ICONS.length - 1) {
      sectionComment.appendChild(button);
    } else {
      sectionReact.appendChild(button);
    }
  }

  const data = feedHandler.getUserData();
  if (item.idUser === data[0]) {
    const initButtons = document.createElement('section');
    const threePoint = document.createElement('paragraph');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const updateButtons = document.createElement('section');
    const iconAddFile = document.createElement('img');
    const saveButton = document.createElement('button');
    const cancelButton = document.createElement('button');
    const textarea = document.createElement('textarea');
    const file = document.createElement('input');

    const formData = new FormData();

    initButtons.classList.add('init-buttons', item.id);
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button', item.id);
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button', item.id);
    threePoint.textContent = '...';
    updateButtons.classList.add('edit-file-update');

    updateButtons.appendChild(iconAddFile);
    updateButtons.appendChild(file);
    updateButtons.appendChild(saveButton);
    updateButtons.appendChild(cancelButton);

    editButton.addEventListener('click', async () => {
      createdAt.style.display = 'none';
      postText.style.display = 'none';
      updateButtons.style.display = 'grid';
      textarea.style.display = 'block';
      initButtons.append(updateButtons);
      initButtons.append(textarea);

      textarea.classList.add('post-text');
      saveButton.textContent = 'Save';
      cancelButton.textContent = 'Cancel';
      iconAddFile.className = 'icon-add-file';
      file.className = 'file-upload';
      saveButton.classList.add('save-button', item.id);

      file.type = 'file';
      file.setAttribute('accept', 'image/*,video/*');
      file.setAttribute('multiple', 'true');
      file.name = 'file[]';
      file.classList.add('file', 'edit-file-post');

      // Download the data of the post
      const postData = await feedHandler.getPostById(item.id);
      textarea.value = postData.text;
      const urls = postData.URL;
      postFigureContainer.innerText = '';
      for (let i = 0; i < urls.length; i++) {
        const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
        createThumbnail(urls[i], thumbnailId, postFigureContainer);
        formData.append(thumbnailId, urls[i]);
      }
      //   getDoc(doc(db, 'post', item.id))
      //     .then((document) => {
      //   textarea.value = document.data().text;
      //   const urls = document.data().URL;
      //   postFigureContainer.innerText = '';
      //   for (let i = 0; i < urls.length; i++) {
      //     const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
      //     createThumbnail(urls[i], thumbnailId, postFigureContainer);
      //     formData.append(thumbnailId, urls[i]);
      //   }
      // });

      postFigureContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
          e.target.parentNode.remove(); // Better than a loop through the thumbnails
          formData.delete(e.target.parentNode.dataset.id);
        }
      });

      // Possibility to upload new images
      file.addEventListener('change', (e) => {
        for (let iterator = 0; iterator < e.target.files.length; iterator++) {
          const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
          createThumbnail(e.target.files[iterator], thumbnailId, postFigureContainer);
          formData.append(thumbnailId, e.target.files[iterator]);
        }
        e.target.value = '';
      });

      // Listener for close button in images
      postFigureContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
          e.target.parentNode.remove(); // Better than a loop through the thumbnails
          formData.delete(e.target.parentNode.dataset.id);
        }
      });

      saveButton.addEventListener('click', async () => {
        if (textarea.value !== '') {
          formData.append('text', textarea.value);
          const res = await feedHandler.updatePost(item.id, formData);
          // const res = updatePost(formData, item.id);
          console.log(res);
        } else {
          popup('You haven\'t writen anything. Please write something for your post');
        }
      });

      cancelButton.addEventListener('click', () => {
        updateButtons.style.display = 'none';
        textarea.style.display = 'none';
        createdAt.style.display = 'block';
        postText.style.display = 'block';
        postFigureContainer.innerHTML = '';
        fillPostData(item.URL, postFigureContainer);
      });
    });
    deleteButton.addEventListener('click', async () => {
      await feedHandler.deletePost(item.id);
    });

    threePoint.appendChild(editButton);
    threePoint.appendChild(deleteButton);
    initButtons.appendChild(threePoint);
    sectionPostData.append(initButtons);
  }

  /** Add messages for existent reactions */
  const id = AuthService.getCurrentUser().uid;
  const que = query(collection(db, 'like'), where('idPost', '==', `${item.id}`));
  onSnapshot(que, (reactionSnapshot) => {
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
  sectionComment.addEventListener('click', (e) => {
    console.log(e.target.classList);
  });

  /** Add messages for existent reactions */
  //   const que2 = query(collection(db, 'like'), where('idPost', '==', `${item.id}`));
  //   onSnapshot(que2, (reactionSnapshot) => {
  //     const likes = [];
  //     reactionSnapshot.docs.forEach((document) => {
  //       likes.push({ ...document.data(), id: document.id });
  //     });
  //     likes.forEach((like) => {
  //       if (like.idUser === auth.currentUser.uid) {
  //         getReactionMessage(like.idTypeLike).then((data) => {
  //           if (data) reactionMessage.style.display = 'block';
  //           reactionMessage.textContent = data.message;
  //         });
  //       }
  //     });
  //   });

  //   /** Event listener for reaction buttons */
  //   sectionReact.addEventListener('click', (e) => {
  //     const [, type, idPub] = e.target.classList;
  //     hasReactedPost(idPub)
  //       .then((reactedSnapshot) => {
  //         if (reactedSnapshot.size > 0) {
  //           if (type === reactedSnapshot.docs[0].data().idTypeLike) {
  //             unreactPost(reactedSnapshot.docs[0].id);
  //             reactionMessage.style.display = 'none';
  //           } else {
  //             updateReactPost(type, reactedSnapshot.docs[0].id);
  //             getReactionMessage(type).then((data) => {
  //               reactionMessage.textContent = data.message;
  //             });
  //           }
  //         } else {
  //           reactPost(idPub, type);
  //           reactionMessage.style.display = 'block';
  //           getReactionMessage(type).then((data) => {
  //             reactionMessage.textContent = data.message;
  //           });
  //         }
  //       });
  //   });

  /** Event listener for comments */
  sectionComment.addEventListener('click', (e) => {
    console.log(e.target.classList);
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
  loadingContainer.append(loadingGif);
  sectionFormatPost.append(loadingContainer);

  return sectionFormatPost;
};
