// import { auth } from '../firebase/firebaseConfig';
import { feedHandler } from '../handlers/feedHandler';
import { popup } from './popup';

const createCloseButton = (thumbnailId) => {
  const closeButton = document.createElement('section');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'x';
  // document.querySelector(`.${thumbnailId}`).appendChild(closeButton); => NO
  document.getElementsByClassName(`${thumbnailId}`)[0].appendChild(closeButton);
};

export const formatCreateComment = (idPost) => {
  const sectionCreateComment = document.createElement('section');
  const sectionTitle = document.createElement('section');
  const sectionComment = document.createElement('section');
  //   const userFigure = document.createElement('figure');
  //   const userImg = document.createElement('img');
  //   const userName = document.createElement('h2');
  const commentText = document.createElement('textarea');
  const buttonComment = document.createElement('button');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  //   feedHandler.getUserData().then((data) => {
  //     userName.innerHTML = data[1];
  //     userImg.src = data[2];
  //   }).catch((err) => popup(err.message));

  sectionCreateComment.className = 'create-comment';
  sectionTitle.className = 'header-post';
  sectionComment.className = 'body-post';

  //   userFigure.className = 'user-figure';
  //   userImg.className = 'user-img';

  buttonComment.style.justifySelf = 'center';
  buttonComment.innerHTML = 'Comment';
  buttonComment.classList.add('comment-button');
  loadingContainer.id = 'loading-container';
  loadingGif.src = '../assets/icons/playground.gif';
  loadingGif.alt = 'loading';

  commentText.placeholder = 'What do you want to comment?';
  commentText.className = 'post-text';

  buttonComment.addEventListener('click', async () => {
    try {
      loadingContainer.style.display = 'block';
      if (commentText.value !== '') {
        console.log(idPost);
        const res = await feedHandler.createComment(idPost, commentText.value);
        loadingContainer.style.display = 'none';
        popup(res);
        if (res === 'The comment has been created') {
          //   loadingContainer.style.display = 'none';
          //   popup(res);
          commentText.value = '';
        }
      } else {
        loadingContainer.style.display = 'none';
        popup('You haven\'t writen anything. Please write something for your comment');
      }
    } catch (err) {
      loadingContainer.style.display = 'none';
      popup(err.message);
    }
  });

  // labelAddFile.appendChild(iconAddFile);
  //   sectionTitle.append(userFigure, userName);
  //   userFigure.append(userImg);
  sectionComment.appendChild(commentText);
  sectionCreateComment.appendChild(sectionTitle);
  sectionCreateComment.appendChild(sectionComment);
  sectionCreateComment.appendChild(buttonComment);
  loadingContainer.append(loadingGif);
  sectionCreateComment.append(loadingContainer);

  return sectionCreateComment;
};

// export default formatCreatePost;
