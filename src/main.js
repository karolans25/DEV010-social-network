// Este es el punto de entrada de tu aplicacion

import init from './views/init';
import error from './views/error.js';
import signin from './views/signin';
import signup from './views/signup';
// import password from './components/password.js';
// import feed from './components/feed.js';
import popup from './views/popup';

const routes = [
  { path: '/', component: init },
  { path: '/error', component: error },
  { path: '/signin', component: signin },
  { path: '/signup', component: signup },
  // { path: '/password', component: password },
  // { path: '/feed', component: feed },
  { path: '/popup', component: popup },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);
  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );
    while (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
