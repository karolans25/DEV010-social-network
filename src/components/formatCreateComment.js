import { auth } from '../lib/firebaseConfig';
import { createComment } from '../lib/user';
import popup from './popup';

function formatCreateComment(idPub) {
  const sectionCreateComment = document.createElement('section');
  const userName = document.createElement('p');
  const sectionComment = document.createElement('section');
  const userFigure = document.createElement('figure');
  const userImg = document.createElement('img');
  const commentText = document.createElement('textarea');
  const commentButton = document.createElement('button');

  const user = auth.currentUser;
  const formData = new FormData();

  sectionCreateComment.className = 'create-post';
  userName.className = 'user-name';
  userName.textContent = user.displayName;
  userFigure.className = 'user-figure';
  userImg.className = 'user-img';
  userImg.src = user.photoURL;
  userImg.alt = 'user img';
  userFigure.className = 'user-figure';
  commentText.className = 'post-text';
  commentText.placeholder = 'What do you want to comment?';

  commentButton.textContent = 'Comment';
  commentButton.addEventListener('click', (e) => {
    try {
      e.preventDefault();
      if (commentText.value !== '') {
        formData.append('text', commentText.value);
        formData.append('idPost', idPub);
        createComment(formData).then((response) => {
          console.log(response);
          if (response.includes('The comment has been created')) {
            popup(response);
            commentText.value = '';
            formData.forEach((value, key) => formData.delete(key));
          }
        }).catch((err) => popup(err.message));
      } else {
        popup('You haven\'t writen anything. Please write something for your comment');
      }
    } catch (err) { popup(err.message); }
  });

  userFigure.append(userImg);
  sectionComment.appendChild(userFigure);
  sectionComment.appendChild(commentText);
  sectionCreateComment.appendChild(userName);
  sectionCreateComment.appendChild(sectionComment);
  sectionCreateComment.appendChild(commentButton);

  return sectionCreateComment;
}

export default formatCreateComment;
