// import { loadDefaultImages } from '../lib/index';

function init(navigateTo) {
  const section = document.createElement('section');
  const img = document.createElement('img');
  const title = document.createElement('h1');
  const buttonStart = document.createElement('button');

  section.className = 'init';
  figure.className = 'init-figure';

  img.src = './assets/1.png';
  img.alt = 'imagen init';

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
