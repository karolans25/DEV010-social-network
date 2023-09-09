import { feedHandler } from '../handlers/feedHandler';

import imgLoading from '../assets/icons/playground.gif';

export const formatComment = async (item) => {
  const sectionFormatComment = document.createElement('section');
  const sectionData = document.createElement('section');
  const sectionComment = document.createElement('section');
  const userName = document.createElement('p');
  const createdAt = document.createElement('p');
  const commentText = document.createElement('p');
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

  sectionFormatComment.classList.add('container-found-comment');
  sectionData.className = 'head-line';
  userName.className = 'user-name';
  sectionComment.className = 'data-comment';
  createdAt.classList.add('created-timestamp', item.id);
  commentText.className = 'comment-text';

  commentText.textContent = item.text;

  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  const dataUser = await feedHandler.getUserDataById(item.idUser);
  userName.textContent = dataUser.name;

  /** Append y append childs for sections */
  sectionData.append(userName, createdAt);
  sectionComment.append(commentText);
  sectionFormatComment.append(sectionData, sectionComment);
  loadingContainer.append(loadingGif);

  return sectionFormatComment;
};
