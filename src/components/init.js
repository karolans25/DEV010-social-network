function init(navigateTo) {
  const section = document.createElement('section');
  const img = document.createElement('img');
  const title = document.createElement('h1');
  const buttonStart = document.createElement('button');
  // const buttonSignUp = document.createElement('button');

  section.className = 'init';

  img.src = './assets/1.png';
  img.alt = 'imagen init';
  buttonStart.textContent = 'Go';
  buttonStart.classList = 'go';
  buttonStart.addEventListener('click', () => {
    navigateTo('/signin');
  });

  title.textContent = 'Title';

  section.append(img, buttonStart, title);
  return section;
}

export default init;
