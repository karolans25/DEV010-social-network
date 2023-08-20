import { navBar } from './navBar';

function feed(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  section.classList.value = 'home';
  subSection.className = 'feed';

  section.append(subSection, nav);

  return section;
}

export default feed;
