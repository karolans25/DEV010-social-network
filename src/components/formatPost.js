import {
  onSnapshot, getDoc, doc, query, collection, where,
} from 'firebase/firestore';
import { db, auth } from '../lib/firebaseConfig';
import popup from './popup';
import {
  reactPost, unreactPost, updateReactPost, hasReactedPost, deletePost,
  updatePost, getReactionMessage,
} from '../lib/user';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  // document.querySelector(`.${thumbnailId}`).appendChild(closeButton);
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

const createThumbnail = (url, id) => {
  const thumbnail = document.createElement('figure');
  console.log(thumbnail);
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  thumbnail.setAttribute('style', `background-image: url(${url})`);
  const subContainer = document.querySelector('.section-edit-post');
  const container = subContainer.querySelector('.post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
};

const createThumbnailFile = (file, iterator, id) => {
  const thumbnail = document.createElement('figure');
  thumbnail.classList.add('thumbnail', id);
  thumbnail.dataset.id = id;

  thumbnail.setAttribute('style', `background-image: url(${URL.createObjectURL(file.files[iterator])})`);
  const container = document.querySelector('.edit-post-figure'); // postImgContainer
  container.appendChild(thumbnail);
  container.style.display = 'grid';
  createCloseButton(id);
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

  sectionUserData.className = 'data-user';
  userName.className = 'user-name';
  userImg.className = 'user-img';
  userFigure.className = 'user-figure';
  sectionPostData.className = 'data-post';
  createdAt.classList.add('created-timestamp', item.id);
  postText.className = 'post-text';
  postFigureContainer.className = 'post-figure';
  sectionReact.className = 'post-react';
  sectionComment.classList.add('post-react', 'comment');
  sectionButtons.className = 'post-buttons';
  reactionMessage.className = 'reaction-message';

  reactionMessage.style.display = 'none';
  postText.textContent = item.text;
  createdAt.textContent = stringDate;
  userImg.alt = 'user img';

  getDoc(doc(db, 'user', item.idUser))
    .then((documentUser) => {
      userName.textContent = documentUser.data().name;
      userImg.src = documentUser.data().photo;
    }).catch((err) => popup(err.message));

  /** Add the images of the post */
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

  /** Create buttons section */
  for (let iterator = 0; iterator < reactIcons.length; iterator++) {
    const button = document.createElement('button');
    const img = document.createElement('img');
    img.src = reactIcons[iterator][0];
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

  if (item.idUser === auth.currentUser.uid) {
    console.log('add buttons');
    console.log(item.id);
    const initButtons = document.createElement('section');
    const threePoint = document.createElement('paragraph');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    initButtons.classList.add('init-buttons', item.id);
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button', item.id);
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button', item.id);
    threePoint.textContent = '...';
    threePoint.appendChild(editButton);
    threePoint.appendChild(deleteButton);
    initButtons.appendChild(threePoint);
    // initButtons.appendChild(editButton);
    // initButtons.appendChild(deleteButton);
    sectionPostData.append(initButtons);
    // createdAt.before(initButtons);
    editButton.addEventListener('click', () => {
      createdAt.style.display = 'none';
      postText.style.display = 'none';
      postFigureContainer.style.display = 'none';
      const textarea = document.createElement('textarea');
      const figure = document.createElement('figure');
      const saveButton = document.createElement('button');
      const labelAddFile = document.createElement('label');
      const iconAddFile = document.createElement('img');
      const file = document.createElement('input');
      const formData = new FormData();
      textarea.classList.add('post-text');
      figure.classList.add('post-figure', 'edit-post-figure');
      figure.style.display = 'block';
      saveButton.textContent = 'Update';
      labelAddFile.className = 'label-add-file';
      iconAddFile.className = 'icon-add-file';
      file.className = 'file-upload';
      saveButton.classList.add('save-button', item.id);

      file.type = 'file';
      file.setAttribute('accept', 'image/*,video/*');
      file.setAttribute('multiple', 'true');
      file.name = 'file[]';
      labelAddFile.htmlFor = 'file-upload';
      file.classList.add('file', 'edit-file-post');
      file.type = 'file';
      file.setAttribute('accept', 'image/*');

      // Upload the data of the post
      getDoc(doc(db, 'post', item.id))
        .then((document) => {
          textarea.value = document.data().text;
          const urls = document.data().URL;
          for (let i = 0; i < urls.length; i++) {
            const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
            createThumbnail(urls[i], thumbnailId);
            formData.append(thumbnailId, urls[i]); // key: thumbnailId, value: file
          }
        });

      // Possibility to upload new images
      file.addEventListener('change', (e) => {
        for (let iterator = 0; iterator < e.target.files.length; iterator++) {
          const thumbnailId = `${Math.floor(Math.random() * 10000)}_${Date.now()}`;
          createThumbnailFile(e.target, iterator, thumbnailId);
          formData.append(thumbnailId, e.target.files[iterator]); // key: thumbnailId, value: file
        }
        e.target.value = ''; // The data is saved in form Data and clear the input file value
      });

      // Listener for close button in images
      figure.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
          e.target.parentNode.remove(); // Better than a loop through the thumbnails
          formData.delete(e.target.parentNode.dataset.id);
        }
      });

      saveButton.addEventListener('click', () => {
        if (textarea.value !== '') {
          formData.append('text', textarea.value);
          console.log('Ocultar el text area y el figure');
          updatePost(formData).then((response) => {
            if (response.includes('The post has been created')) {
              popup(response);
              textarea.value = '';
              figure.innerHTML = '';
              formData.forEach((value, key) => formData.delete(key));
              createdAt.style.display = 'none';
              postText.style.display = 'none';
              postFigureContainer.style.display = 'none';
            }
          }).catch((err) => popup(err.message));
        } else {
          popup('You haven\'t writen anything. Please write something for your post');
        }
      });

      // labelAddFile.appendChild(iconAddFile);
      initButtons.append(iconAddFile, file, textarea, figure, saveButton);
      // updateDoc(doc(db, 'like', idLike), {
      //   idTypeLike: idType,
      //   likedAt: serverTimestamp(),
      // });
    });
    deleteButton.addEventListener('click', () => {
      deletePost(item.id);
    });
  }

  /** Add messages for existent reactions */
  // const que2 = query(collection(db, 'like'), where('idPost', '==', `${item.id}`, where('idUser', '==', auth.currentUser.uid)));
  const que2 = query(collection(db, 'like'), where('idPost', '==', `${item.id}`));
  onSnapshot(que2, (reactionSnapshot) => {
    const likes = [];
    reactionSnapshot.docs.forEach((document) => {
      likes.push({ ...document.data(), id: document.id });
    });
    likes.forEach((like) => {
      if (like.idUser === auth.currentUser.uid) {
        getReactionMessage(like.idTypeLike).then((data) => {
          if (data) reactionMessage.style.display = 'block';
          reactionMessage.textContent = data.message;
        });
      }
    });
  });

  /** Event listener for reaction buttons */
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

  return sectionFormatPost;
};
