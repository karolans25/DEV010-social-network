import imgHome from '../assets/icons/home.png';
import imgRss from '../assets/icons/rss.png';
import imgPlus from '../assets/icons/mas.png';
import imgSearch from '../assets/icons/lupa.png';
import imgUser from '../assets/icons/usuario.png';

export const navbar = (navigateTo) => {
  const nav = document.createElement('section');
  const ul = document.createElement('ul');
  const div = document.createElement('div');

  nav.className = 'navigation';

  const icons = [
    {
      alt: 'feed', path: '/feed',
    },
    {
      alt: 'my posts', path: '/myPosts',
    },
    {
      alt: 'plus', path: '/feed',
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
    if (i === 0) {
      li.classList.value = 'list active';
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
    img.alt = icons[i].alt;
    button.appendChild(img);
    li.appendChild(button);
    ul.append(li);
  }
  div.className = 'indicator';
  ul.append(div);

  nav.append(ul);

  // console.clear();
  // const nav = document.querySelector('.navigation');
  // const list = document.querySelectorAll('.list');
  // console.log(list);
  // list.forEach((item) => item.addEventListener('click', (e) => {
  //   console.log(item);
  //   list.forEach((li) => li.classList.remove('active'));
  //   e.preventDefault();
  //   alert(e.currentTarget);
  //   e.currentTarget.classList.add('active');
  // }));

  return nav;
};

// export default navBar;
