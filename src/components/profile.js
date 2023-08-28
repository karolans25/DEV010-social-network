import { signOutAuth } from '../lib/user';
import { navBar } from './navBar';

function profile(navigateTo) {
  const section = document.createElement('section');
  const subSection = document.createElement('section');
  const nav = navBar(navigateTo);

  const buttonSignOut = document.createElement('button');
  buttonSignOut.textContent = 'Sign Out';
  buttonSignOut.addEventListener('click', (e) => {
    e.preventDefault();
    signOutAuth();
  });
  /*
  const list = document.getElementsByClassName('list');
  list.forEach((element) => {
    element.classList.remove('active');
    if (element.id === 'list-profile') {
      element.classList.add('active');
    }
  });
  */

  section.classList.value = 'home';
  subSection.className = 'profile';

  subSection.append(buttonSignOut);
  section.append(subSection, nav);

  return section;
}

export default profile;
