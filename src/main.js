// Este es el punto de entrada de tu aplicacion
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebaseConfig';
import init from './components/init';
import error from './components/error';
import signin from './components/signin';
import signup from './components/signup';
import password from './components/password';
import feed from './components/feed';
import myPosts from './components/myPosts';
import search from './components/search';
import profile from './components/profile';
import popup from './components/popup';

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
  if (user) {
    if (path === '/feed') {
    //    user.getIdToken().then((token) => {
    // Aquí obtienes el nuevo token válido
    // Puedes almacenarlo en una variable o actualizarlo en tu base de datos
    //      console.log(token);
    //    }).catch((err) => {
    //      popup(err.message);
    // Manejo de errores
    //    }); // const uid = user.uid;

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
