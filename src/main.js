// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import init from './components/init.js';
import error from './components/error.js';
import signin from './components/signin.js';
import signup from './components/signup.js';
import password from './components/password.js';
import feed from './components/feed.js';

myFunction();

const routes = [
  { path: '/', component: init },
  { path: '/error', component: error },
  { path: '/signin', component: signin },
  { path: '/signup', component: signup },
  { path: '/password', component: password },
  { path: '/feed', component: feed },
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
