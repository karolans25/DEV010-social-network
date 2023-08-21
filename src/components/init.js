// import { loadDefaultImages } from '../lib/index';

function init(navigateTo) {
  const section = document.createElement('section');
  const img = document.createElement('img');
  const title = document.createElement('h1');
  const buttonStart = document.createElement('button');
  const figure = document.createElement('figure');

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

  title.textContent = 'Title';

  section.append(figure, buttonStart, title);

  return section;
}

export default init;
