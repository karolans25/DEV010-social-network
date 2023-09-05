// export function navBar(navigateTo) {
export const navbar = (navigateTo) => {
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');

  nav.className = 'navigation';

  const icons = [
    {
      src: './assets/icons/home.png', alt: 'feed', path: '/feed',
    },
    {
      src: './assets/icons/rss.png', alt: 'my posts', path: '/myPosts',
    },
    {
      src: './assets/icons/mas.png', alt: 'plus', path: '/feed',
    },
    {
      src: './assets/icons/lupa.png', alt: 'search', path: '/search',
    },
    {
      src: './assets/icons/usuario.png', alt: 'user', path: '/profile',
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
    img.src = icons[i].src;
    img.alt = icons[i].alt;
    button.appendChild(img);
    li.appendChild(button);
    ul.append(li);
  }

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
