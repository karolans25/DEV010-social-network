import { feedHandler } from '../handlers/feedHandler';
import { header } from './header';
import { navbar } from './navbar';
import { profileHandler } from '../handlers/profileHandler';

import { REACT_ICONS, PROFILE_PARTS } from '../consts/const';

import imgExit from '../assets/icons/signout.png';
import imgIconAddFile from '../assets/icons/file.png';
import imgLike from '../assets/icons/voto-positivo.png';
import imgDislike from '../assets/icons/voto-negativo.png';
import imgLove from '../assets/icons/salud-mental.png';
import imgBest from '../assets/icons/calidad-premium.png';
import imgDoubts from '../assets/icons/investigar.png';
import imgComment from '../assets/icons/comentario.png';
// import imgLoading from '../assets/icons/playground.gif';
import iconEmail from '../assets/icons/email.png';
import iconPosts from '../assets/icons/posts.png';
import iconReactions from '../assets/icons/reactions.png';
import iconFriends from '../assets/icons/friends.png';
import iconLast from '../assets/icons/last.png';

export const profile = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const head = await header(navigateTo);
  const nav = navbar(navigateTo);
  const buttonSignOut = document.createElement('button');
  const imgSignOut = document.createElement('img');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const iconAddFile = document.createElement('img');
  const file = document.createElement('input');
  const title = document.createElement('h2');
  const sectionData = document.createElement('section');
  const sectionReactions = document.createElement('section');

  const data = await feedHandler.getUserData();

  section.className = 'home';
  subSection.classList.add('profile');
  sectionData.style.display = 'grid';
  sectionData.classList.add('profile-data');
  sectionReactions.classList.add('section-reaction');

  iconAddFile.classList.add('icon-add-file');
  iconAddFile.src = imgIconAddFile;
  file.classList.add('file', 'file-upload', 'file-profile');
  buttonSignOut.classList.add('signout-button');
  imgSignOut.src = imgExit;
  imgSignOut.alt = 'sign out';
  figure.style.display = 'grid';
  file.name = 'file';
  file.type = 'file';
  file.setAttribute('accept', 'image/*');
  img.src = data[2];
  img.alt = 'user icon';
  title.textContent = data[1];
  title.style.textAlign = 'center';
  title.style.fontSize = '30px';

  const posts = await feedHandler.getAllMyPost();

  const likes = await feedHandler.getAllMyReactions();

  const comments = await feedHandler.getAllMyComments();

  const typeLikes = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < likes.length; i++) {
    const pos = parseInt(likes[i].idTypeLike, 10) - 1;
    typeLikes[pos] += 1;
  }

  typeLikes[REACT_ICONS.length - 1] = comments.length;

  let stringDate = 'You haven\'t created any post yet!';
  if (posts[0]) {
    const date = posts[0].createdAt.toDate();
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    stringDate = date.toLocaleString('en-US', options);
  }

  for (let i = 0; i < PROFILE_PARTS.length; i++) {
    const sub = document.createElement('section');
    const imgPart = document.createElement('img');
    const labelPart = document.createElement('label');
    const paragraphPart = document.createElement('paragraph');
    sub.classList.add('sub-part');
    paragraphPart.style.alignItems = 'center';
    if (i === 0) imgPart.src = iconEmail;
    if (i === 1) imgPart.src = iconPosts;
    if (i === 2) imgPart.src = iconReactions;
    if (i === 3) imgPart.src = iconFriends;
    if (i === 4) imgPart.src = iconLast;
    imgPart.alt = PROFILE_PARTS[i];
    labelPart.textContent = PROFILE_PARTS[i];
    if (i === 0) paragraphPart.textContent = data[3];
    if (i === 1) paragraphPart.textContent = (posts.length === 1) ? '1 post created' : `${posts.length} posts created`;
    if (i === 2) {
      for (let j = 0; j < REACT_ICONS.length; j++) {
        const reaction = document.createElement('aside');
        const imgReaction = document.createElement('img');
        const labelReaction = document.createElement('label');
        reaction.classList.add('reaction');
        if (j === 0) imgReaction.src = imgLike;
        if (j === 1) imgReaction.src = imgDislike;
        if (j === 2) imgReaction.src = imgLove;
        if (j === 3) imgReaction.src = imgBest;
        if (j === 4) imgReaction.src = imgDoubts;
        if (j === 5) imgReaction.src = imgComment;
        imgReaction.alt = REACT_ICONS[j];
        imgReaction.classList.add('react-image');
        labelReaction.textContent = typeLikes[j];
        reaction.append(imgReaction, labelReaction);
        sectionReactions.append(reaction);
      }
    }
    if (i === 3) paragraphPart.textContent = `${5} friends`;
    if (i === 4) paragraphPart.textContent = (stringDate !== '') ? stringDate : 'You haven\'t posted yet!';

    sub.append(imgPart, labelPart);
    if (i === 2) {
      sectionData.append(sub, sectionReactions);
    } else {
      sectionData.append(sub, paragraphPart);
    }
  }

  file.addEventListener('change', (e) => {
    img.src = URL.createObjectURL(e.target.files[0]);
    e.target.value = '';
  });

  buttonSignOut.addEventListener('click', () => {
    profileHandler.signout();
    navigateTo('/signin');
  });

  // buttonSignOut.appendChild(imgSignOut);
  figure.append(img, iconAddFile, file);
  // subSection.appendChild(buttonSignOut);
  // subSection.append(buttonSignOut, figure, title, sectionData);
  // subSection.append(figure, title, sectionData);
  subSection.append(title, sectionData);
  section.append(head, subSection, nav);

  return section;
};
