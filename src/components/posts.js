import { navBar } from './navBar';

function posts(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar();

  //   const list = document.getElementsByClassName('list');
  //   for (let i = 0; i < list.length; i++) {
  //     list[i].classList = 'list';
  //     if (list[i].id === 'list-posts') {
  //       list[i].classList = 'list active';
  //     }
  //   }

  section.classList.value = 'home';
  subSection.className = 'posts';

  section.append(subSection, nav);

  return section;
}

export default posts;
