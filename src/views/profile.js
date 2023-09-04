import {
  collection, query, orderBy, onSnapshot, where,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { feedHandler } from '../handlers/feedHandler';
import { navbar } from './navbar';
import { profileHandler } from '../handlers/profileHandler';

export const profile = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
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
  file.classList.add('file', 'file-upload', 'file-profile');
  buttonSignOut.classList.add('signout-button');
  imgSignOut.src = '../assets/icons/logout.png';
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

  const reactIcons = [
    ['../assets/icons/voto-positivo.png', 'Like'],
    ['../assets/icons/voto-negativo.png', 'Dislike'],
    ['../assets/icons/salud-mental.png', 'Love it'],
    ['../assets/icons/calidad-premium.png', 'The best'],
    ['../assets/icons/investigar.png', 'Make me doubt'],
    ['../assets/icons/comentario.png', 'Comment'],
  ];

  const profileParts = [
    ['../assets/icons/email.png', 'Email'],
    ['../assets/icons/posts.png', 'Posts'],
    ['../assets/icons/reactions.png', 'Reactions'],
    ['../assets/icons/friends.png', 'Friends'],
    ['../assets/icons/last.png', 'Last post'],
  ];

  const posts = await feedHandler.getAllMyPost();

  const likes = await feedHandler.getAllMyReactions();

  const typeLikes = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < likes.length; i++) {
    const pos = parseInt(likes[i].idTypeLike, 10) - 1;
    typeLikes[pos] += 1;
  }

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
  const stringDate = date.toLocaleString('en-US', options);

  for (let i = 0; i < profileParts.length; i++) {
    const imgPart = document.createElement('img');
    const labelPart = document.createElement('label');
    const paragraphPart = document.createElement('paragraph');
    imgPart.src = profileParts[i][0];
    imgPart.alt = profileParts[i][1];
    labelPart.textContent = profileParts[i][1];
    if (i === 0) paragraphPart.textContent = data[3];
    if (i === 1) paragraphPart.textContent = (posts.length === 1) ? '1 post created' : `${posts.length} posts created`;
    if (i === 2) {
      for (let j = 0; j < reactIcons.length; j++) {
        const reaction = document.createElement('aside');
        const imgReaction = document.createElement('img');
        const labelReaction = document.createElement('label');
        reaction.classList.add('reaction');
        imgReaction.src = reactIcons[j][0];
        imgReaction.alt = reactIcons[j][1];
        imgReaction.classList.add('react-image');
        labelReaction.textContent = typeLikes[j];
        reaction.append(imgReaction, labelReaction);
        sectionReactions.append(reaction);
      }
    }
    if (i === 3) paragraphPart.textContent = `${5} friends`;
    if (i === 4) paragraphPart.textContent = stringDate;

    if (i === 2) {
      sectionData.append(imgPart, labelPart, sectionReactions);
    } else {
      sectionData.append(imgPart, labelPart, paragraphPart);
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
  //   sectionData.append(imgEmail, labelEmail, paragraphEmail);
  //   sectionData.append(imgPost, labelPost, paragraphPost);
  //   sectionData.append(imgReactions, labelReactions, sectionReactions);
  //   sectionData.append(imgFriends, labelFriends, paragraphFriends);
  //   sectionData.append(imgLastPost, labelLastPost, paragraphLastPost);
  buttonSignOut.appendChild(imgSignOut);
  figure.append(img, iconAddFile, file);
  subSection.appendChild(buttonSignOut);
  subSection.append(buttonSignOut, figure, title, sectionData);
  section.append(subSection, nav);

  return section;
};
