import { navBar } from './navBar';

function profile(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  const list = document.getElementsByClassName('list');
  list.forEach((element) => {
    element.classList.remove('active');
    if (element.id === 'list-profile') {
      element.classList.add('active');
    }
  });

  section.classList.value = 'home';
  subSection.className = 'profile';

  section.append(subSection, nav);

  return section;
}

export default profile;
