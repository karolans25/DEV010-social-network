// import { loadDefaultImages } from '../lib/index';

const init = (navigateTo) => {
  const section = document.createElement('section');
  const img = document.createElement('img');
  const title = document.createElement('h1');
  const buttonStart = document.createElement('button');
  const figure = document.createElement('figure');
  const paragraph = document.createElement('paragraph');

  section.className = 'init';
  figure.className = 'init-figure';

  img.src = './assets/1.png';
  img.alt = 'imagen init';
  figure.append(img);

  buttonStart.textContent = 'Go';
  buttonStart.className = 'go';
  buttonStart.addEventListener('click', () => {
    navigateTo('/signin');
  });

  title.textContent = 'Caro PG';

  paragraph.innerHTML = 'Create Technology to make things happen! 🌎💻👣';

  // section.append(figure, p, buttonStart, title);
  section.append(figure, title, paragraph, buttonStart);

  return section;
};

export default init;
