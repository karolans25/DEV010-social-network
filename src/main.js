import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
// Este es el punto de entrada de tu aplicacion

import init from './views/init';
import error from './views/error.js';
import { signin } from './views/signin';
import { signup } from './views/signup';
import { password } from './views/password';
import { popup } from './views/popup';
import { feed } from './views/feed';
import { myPosts } from './views/myPosts';
import { profile } from './views/profile';

const routes = [
  { path: '/', component: init },
  { path: '/error', component: error },
  { path: '/signin', component: signin },
  { path: '/signup', component: signup },
  { path: '/password', component: password },
  { path: '/popup', component: popup },
  { path: '/feed', component: feed },
  { path: '/myPosts', component: myPosts },
  { path: '/profile', component: profile },
];

const defaultRoute = '/';
const root = document.getElementById('root');

async function navigateTo(hash) {
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
    root.appendChild(await route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (user) {
    if (path === '/feed') {
      navigateTo('/feed');
    } else if (path === '/myPosts') {
      navigateTo('/myPosts');
    } else if (path === '/search') {
      navigateTo('/search');
    } else if (path === '/profile') {
      navigateTo('/profile');
    }
  } else {
    popup('Please sign in or sign up to start!');
    navigateTo('/signin');
  }
});
