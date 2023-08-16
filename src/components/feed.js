function feed(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const p = document.createElement('p');

  section.className = 'feed';
  title.innerHTML = 'Feed';
  p.innerHTML = 'Welcome to the app';

  section.append(title, p);

  return section;
}

export default feed;
