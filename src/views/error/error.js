function error() {
  
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.type = 'text/css';
  linkElement.href = './views/error/error.style.css';

  const section = document.createElement('section');
  // section.classList = ['error'];
  section.className = 'error';

  const title = document.createElement('h2');
  title.classList = ['.error-title'];
  title.textContent = 'Error 404 page no found, please go home';
  section.appendChild(title);

  section.addEventListener('click', (e) => {
    e.preventDefault();
    // navigateTo('/');
  });

  alert('Wait');
  return section;
}

export default error;
