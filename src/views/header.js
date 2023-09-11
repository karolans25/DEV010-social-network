import { profileHandler } from '../handlers/profileHandler';
import { feedHandler } from '../handlers/feedHandler';

import { TITLE } from '../consts/const';

import imgExit from '../assets/icons/signout.png';

export const header = async (navigateTo) => {
  const head = document.createElement('header');
  const title = document.createElement('h2');
  const userFigure = document.createElement('figure');
  const userImg = document.createElement('img');
  const userName = document.createElement('h3');
  const buttonSignOut = document.createElement('button');
  const imgSignOut = document.createElement('img');

  head.classList.add('header');
  title.textContent = TITLE;
  userFigure.className = 'user-figure';
  userImg.className = 'user-img';
  const data = await feedHandler.getUserData();
  userName.innerHTML = data[1];
  userImg.src = data[2];
  userImg.alt = 'user img';

  imgSignOut.src = imgExit;
  imgSignOut.alt = 'sign out';
  buttonSignOut.classList.add('signout-button');

  buttonSignOut.addEventListener('click', () => {
    profileHandler.signout();
    navigateTo('/signin');
  });

  userFigure.appendChild(userImg);
  buttonSignOut.appendChild(imgSignOut);
  head.append(title, userFigure, userName, buttonSignOut);

  return head;
};
