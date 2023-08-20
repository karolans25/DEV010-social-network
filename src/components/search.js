import { navBar } from './navBar';

function search(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  section.classList.value = 'home';
  subSection.className = 'search';

  section.append(subSection, nav);

  return section;
}

export default search;
