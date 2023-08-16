function init(navigateTo) {
  const section = document.createElement('section');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const title = document.createElement('h1');
  const buttonStart = document.createElement('button');
  // const bubles = document.createElement('section');
  // const buttonSignUp = document.createElement('button');

  section.className = 'init';
  figure.classList = ['bubles', 'init-figure'];
  for (let i = 0; i < 12; i++) {
    const buble = document.createElement('section');
    buble.className = 'buble';
    figure.append(buble);
  }

  img.src = './assets/1.png';
  img.alt = 'imagen init';
  figure.append(img);

  buttonStart.textContent = 'Go';
  buttonStart.classList = 'go';
  buttonStart.addEventListener('click', () => {
    navigateTo('/signin');
  });

  title.textContent = 'Title';

  section.append(figure, buttonStart, title);
  return section;
}

export default init;
