import { navBar } from './navBar';

function search(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  const list = document.getElementsByClassName('list');
  list.forEach((element) => {
    element.classList.remove('active');
    if (element.id === 'list-search') {
      element.classList.add('active');
    }
  });

  section.classList.value = 'home';
  subSection.className = 'search';

  section.append(subSection, nav);

  return section;
}

export default search;
