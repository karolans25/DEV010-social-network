import { navBar } from './navBar';

function feed(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  // const list = document.getElementsByClassName('list');
  // for (let i = 0; i < list.length; i++) {
  //   list[i].classList.remove('active');
  //   if (list[i].id === 'list-feed') {
  //     list[i].classList.add('active');
  //   }
  // }

  section.classList.value = 'home';
  subSection.className = 'feed';

  section.append(subSection, nav);

  return section;
}

export default feed;
