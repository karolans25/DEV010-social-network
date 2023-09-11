import imgHome from '../assets/icons/home.png';
import imgRss from '../assets/icons/rss.png';
import imgPlus from '../assets/icons/plus.png';
import imgSearch from '../assets/icons/lupa.png';
import imgUser from '../assets/icons/usuario.png';

export const navbar = (navigateTo) => {
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  nav.className = 'navigation';

  const icons = [
    {
      alt: 'feed', path: '/feed',
    },
    {
      alt: 'my posts', path: '/myPosts',
    },
    {
      alt: 'plus', path: '/plus',
    },
    {
      alt: 'search', path: '/search',
    },
    {
      alt: 'user', path: '/profile',
    },
  ];

  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const img = document.createElement('img');
    li.id = `list-${icons[i].alt}`;
    li.classList.value = 'list';
    if (window.location.pathname === icons[i].path) {
      li.classList.add('active');
    }
    button.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(icons[i].path);
    });
    if (i === 0) img.src = imgHome;
    if (i === 1) img.src = imgRss;
    if (i === 2) img.src = imgPlus;
    if (i === 3) img.src = imgSearch;
    if (i === 4) img.src = imgUser;
    // img.src = icons[i].src;
    img.alt = icons[i].alt;
    button.appendChild(img);
    li.appendChild(button);
    ul.append(li);
  }

  nav.append(ul);

  return nav;
};

// export default navBar;
