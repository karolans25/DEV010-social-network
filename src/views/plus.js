import { header } from './header/header';
import { navbar } from './navbar';

import imgLoading from '../assets/icons/playground.gif';

export const plus = async (navigateTo) => {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const head = await header(navigateTo);
  const nav = navbar(navigateTo);
  const title = document.createElement('h2');
  const loadingContainer = document.createElement('aside');
  const loadingGif = document.createElement('img');

  section.classList.value = 'home';
  subSection.className = 'feed';
  title.innerHTML = 'Plus';
  title.style.marginTop = '30px';

  loadingContainer.id = 'loading-container';
  loadingGif.src = imgLoading;
  loadingGif.alt = 'loading';

  subSection.append(title, loadingContainer);
  section.append(head, subSection, nav);
  loadingContainer.append(loadingGif);

  return section;
};
