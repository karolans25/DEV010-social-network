import imgInit from '../assets/init.png';
import { TITLE } from '../consts/const';

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
  figure.className = 'init-figure';

  img.src = imgInit;
  img.alt = 'imagen init';
  figure.append(img);

  buttonStart.textContent = 'Go';
  buttonStart.className = 'go';
  buttonStart.addEventListener('click', () => {
    navigateTo('/signin');
  });

  title.textContent = TITLE;

  paragraph.innerHTML = 'Create Technology to make things happen! 🌎💻👣';

  // section.append(buttonMode, figure, title, paragraph, buttonStart);
  section.append(figure, title, paragraph, buttonStart);

  return section;
};

export default init;
