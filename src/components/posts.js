import { navBar } from './navBar';

function posts(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  section.classList.value = 'home';
  subSection.className = 'posts';

  section.append(subSection, nav);

  return section;
}

export default posts;
