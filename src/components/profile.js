import { navBar } from './navBar';

function profile(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  section.classList.value = 'home';
  subSection.className = 'profile';

  section.append(subSection, nav);

  return section;
}

export default profile;
