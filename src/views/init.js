// import { loadDefaultImages } from '../lib/index';
// const body = document.querySelector('body');

// const store = (value) => {
//   localStorage.setItem('lightMode', value);
// };

// const load = () => {
//   const lightMode = localStorage.getItem('lightMode');
//   if (!lightMode) {
//     store('false');
//   } else if (lightMode === 'true') {
//     body.classList.add('light-mode');
//   }
// };
import { TITLE } from '../consts/consts';
import imgUrl from '../assets/1.png';

const init = (navigateTo) => {
  // load();

  const section = document.createElement('section');
  // const buttonMode = document.createElement('button');
  const img = document.createElement('img');
  const title = document.createElement('h1');
  const buttonStart = document.createElement('button');
  const figure = document.createElement('figure');
  const paragraph = document.createElement('paragraph');

  section.className = 'init';
  // const imgMode = document.createElement('img');
  // imgMode.src = '../assets/icons/light.png';
  // imgMode.style.width = '30px';
  // imgMode.style.height = '30px';
  // imgMode.style.border = 'solid 1px var(--contrast-color)';
  // imgMode.style.padding = '5px';
  // buttonMode.id = 'bLight';
  // buttonMode.style.maxWidth = '50px';
  // buttonMode.style.border = 'none';
  // buttonMode.style.width = 'fit.content';
  // buttonMode.style.height = 'fit-content';
  // buttonMode.style.padding = '0';
  // buttonMode.style.backgroundColor = 'var(--main-color)';
  // buttonMode.style.fontStyle = '10px';
  // buttonMode.style.justifySelf = 'end';
  // buttonMode.appendChild(imgMode);
  figure.className = 'init-figure';

  img.src = imgUrl;
  img.alt = 'imagen init';
  figure.append(img);

  buttonStart.textContent = 'Go';
  buttonStart.className = 'go';
  buttonStart.addEventListener('click', () => {
    navigateTo('/signin');
  });

  title.textContent = TITLE;

  paragraph.innerHTML = 'Create Technology to make things happen! 🌎💻👣';

  // buttonMode.addEventListener('click', () => {
  //   body.classList.toggle('light-mode');
  //   if (body.classList.contains('light-mode')) {
  //     imgMode.src = '../assets/icons/light.png';
  //     store(true);
  //     navigateTo('/');
  //   } else {
  //     imgMode.src = '../assets/icons/dark.png';
  //     store(false);
  //     navigateTo('/');
  //   }
  // });

  // section.append(buttonMode, figure, title, paragraph, buttonStart);
  section.append(figure, title, paragraph, buttonStart);

  return section;
};

export default init;
