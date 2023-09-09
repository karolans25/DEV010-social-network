// import { auth } from '../firebase/firebaseConfig';
import { feedHandler } from '../handlers/feedHandler';
import { popup } from './popup';

import imgLoading from '../assets/icons/playground.gif';

export const formatCreateComment = (idPost) => {
  const sectionCreateComment = document.createElement('section');
  const commentText = document.createElement('textarea');
  const buttonComment = document.createElement('button');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  sectionCreateComment.className = 'create-comment';
  buttonComment.style.justifySelf = 'center';
  buttonComment.innerHTML = 'Comment';
  buttonComment.classList.add('comment-button');
  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  commentText.placeholder = 'What do you want to comment?';
  commentText.className = 'comment-text';

  buttonComment.addEventListener('click', async () => {
    try {
      loadingContainer.style.display = 'block';
      if (commentText.value !== '') {
        const res = await feedHandler.createComment(idPost, commentText.value);
        loadingContainer.style.display = 'none';
        popup(res);
        if (res === 'The comment has been created') {
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

  sectionCreateComment.appendChild(commentText);
  sectionCreateComment.appendChild(buttonComment);
  loadingContainer.append(loadingGif);
  sectionCreateComment.append(loadingContainer);

  return sectionCreateComment;
};

// export default formatCreatePost;
