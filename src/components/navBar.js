export function navBar(navigateTo) {
  const nav = document.createElement('section');
  const ul = document.createElement('ul');
  const div = document.createElement('div');

  nav.className = 'navigation';

  const icons = [
    {
      src: './assets/icons/home.png', alt: 'feed', path: '/feed', style: '--clr:#f44336', icon: 'home-outline',
    },
    {
      src: './assets/icons/rss.png', alt: 'posts', path: '/posts', style: '--clr:#ffa117', icon: 'person-outline',
    },
    {
      src: './assets/icons/mas.png', alt: 'plus', path: '/feed', style: '--clr:#0fc70f', icon: 'chatbubble-outline',
    },
    {
      src: './assets/icons/lupa.png', alt: 'search', path: '/search', style: '--clr:#2196f3', icon: 'camera-outline',
    },
    {
      src: './assets/icons/usuario.png', alt: 'user', path: '/profile', style: '--clr:#b145e9', icon: 'settings-outline',
    },
  ];

  for (let i = 0; i < 5; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const span = document.createElement('span');
    const img = document.createElement('img');
    // const ionIcon = document.createElement('ion-icon');
    li.id = `list-${icons[i].alt}`;
    li.classList.value = 'list';
    if (i === 0) {
      li.classList.value = 'list active';
    }
    // li.style = icons[i].style;
    a.href = icons[i].path;
    span.className = 'icon';
    // ionIcon.name = icons[i].icon;
    img.src = icons[i].src;
    img.alt = icons[i].alt;
    // li.append(a, img);
    li.appendChild(a);
    a.appendChild(span);
    span.appendChild(img);
    // span.appendChild(ionIcon);
    // li.append(a, span, ionIcon);
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
}

// export default navBar;
