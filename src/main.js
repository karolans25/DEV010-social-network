// Este es el punto de entrada de tu aplicacion
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, collection } from 'firebase/firestore';
import { auth, db } from './lib/firebaseConfig';
import init from './components/init.js';
import error from './components/error.js';
import signin from './components/signin.js';
import signup from './components/signup.js';
import password from './components/password.js';
import feed from './components/feed.js';
import myPosts from './components/myPosts';
import search from './components/search.js';
import profile from './components/profile.js';
import popup from './components/popup.js';

const routes = [
  { path: '/', component: init },
  { path: '/error', component: error },
  { path: '/signin', component: signin },
  { path: '/signup', component: signup },
  { path: '/password', component: password },
  { path: '/feed', component: feed },
  { path: '/myPosts', component: myPosts },
  { path: '/search', component: search },
  { path: '/profile', component: profile },
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

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (user && path === '/feed') {
    user.getIdToken().then((token) => {
      // Aquí obtienes el nuevo token válido
      // Puedes almacenarlo en una variable o actualizarlo en tu base de datos
      console.log(token);
    }).catch((err) => {
      popup(err.message);
      // Manejo de errores
    }); // const uid = user.uid;
    // const colRef = collection(db, 'user');
    // onSnapshot(colRef, (snapshot) => {
    //   console.log('Línea 85 de index.js');
    //   console.log(snapshot.docs);
    // setupUsers(snapshot.docs);
    // setupUI(user);
    // })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    navigateTo('/feed');
  } else if (user && path === '/myPosts') {
    navigateTo('/myPosts');
  } else if (user && path === '/search') {
    navigateTo('/search');
  } else if (user && path === '/profile') {
    navigateTo('/profile');
  } else if (!user) {
    popup('Please sign in or sign up to start!');
    navigateTo('/signin');
  }
});
