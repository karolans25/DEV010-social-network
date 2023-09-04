import { profileHandler } from '../handlers/profileHandler';
import { navbar } from './navbar';

export const profile = (navigateTo) => {
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
  const imgEmail = document.createElement('img');
  const labelEmail = document.createElement('label');
  const paragraphEmail = document.createElement('paragraph');
  const imgPost = document.createElement('img');
  const labelPost = document.createElement('label');
  const paragraphPost = document.createElement('paragraph');
  const imgReactions = document.createElement('img');
  const labelReactions = document.createElement('label');
  const sectionReactions = document.createElement('section');
  const imgFriends = document.createElement('img');
  const labelFriends = document.createElement('label');
  const paragraphFriends = document.createElement('paragraph');
  const imgLastPost = document.createElement('img');
  const labelLastPost = document.createElement('label');
  const paragraphLastPost = document.createElement('paragraph');

  // const user = profileHandler.getUserData();

  // section
  section.className = 'profile';
  sectionData.style.display = 'grid';
  sectionData.classList.add('profile-data');

  iconAddFile.classList.add('icon-add-file');
  file.classList.add('file', 'file-upload', 'file-profile');
  buttonSignOut.classList.add('signout-button');
  imgSignOut.src = '../assets/icons/logout.png';
  imgSignOut.alt = 'sign out';
  figure.style.display = 'grid';
  file.name = 'file';
  file.type = 'file';
  file.setAttribute('accept', 'image/*');
  img.src = '../assets/icons/nina.png';
  img.alt = 'user icon';
  title.textContent = 'Carolina';

  imgEmail.src = '../assets/icons/personas.png';
  imgEmail.alt = 'email';
  labelEmail.textContent = 'Email';
  paragraphEmail.textContent = 'priyacarito@gmail.com';

  imgPost.src = '../assets/icons/personas.png';
  imgPost.alt = 'posts';
  labelPost.textContent = 'Posts';
  paragraphPost.textContent = `${1} posts created`;

  imgFriends.src = '../assets/icons/personas.png';
  imgFriends.alt = 'friends';
  labelFriends.textContent = 'Friends';
  paragraphFriends.textContent = `${5} friends`;

  imgLastPost.src = '../assets/icons/personas.png';
  imgLastPost.alt = 'last-post';
  labelLastPost.textContent = 'Last Post';
  paragraphLastPost.textContent = `${1} today`;

  const reactIcons = [
    ['../assets/icons/voto-positivo.png', 'Like'],
    ['../assets/icons/voto-negativo.png', 'Dislike'],
    ['../assets/icons/salud-mental.png', 'Love it'],
    ['../assets/icons/calidad-premium.png', 'The best'],
    ['../assets/icons/investigar.png', 'Make me doubt'],
    ['../assets/icons/comentario.png', 'Comment'],
  ];

  imgReactions.src = '../assets/icons/personas.png';
  imgReactions.alt = 'reactions';
  labelReactions.innerHTML = 'Reactions';
  for (let i = 0; i < reactIcons.length; i++) {
    const imgReaction = document.createElement('img');
    const labelReaction = document.createElement('label');
    imgReaction.src = reactIcons[i][0];
    imgReaction.alt = reactIcons[i][1];
    imgReaction.classList.add('react-image');
    labelReaction.textContent = 1;
    sectionReactions.append(imgReaction, labelReaction);
  }

  file.addEventListener('change', (e) => {
    img.src = URL.createObjectURL(e.target.files[0]);
    e.target.value = '';
  });

  sectionData.append(imgEmail, labelEmail, paragraphEmail);
  sectionData.append(imgPost, labelPost, paragraphPost);
  sectionData.append(imgReactions, labelReactions, sectionReactions);
  sectionData.append(imgFriends, labelFriends, paragraphFriends);
  sectionData.append(imgLastPost, labelLastPost, paragraphLastPost);
  buttonSignOut.appendChild(imgSignOut);
  figure.append(img, iconAddFile, file);
  subSection.appendChild(buttonSignOut);
  subSection.append(buttonSignOut, figure, title, sectionData);
  section.append(subSection, nav);

  return section;
};
