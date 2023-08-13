// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
import init from './components/init.js';
myFunction();

const routes = [
	{ path: '/', component: init }
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash){
	const route = routes.find((routeFound) => routeFound.path === hash);
	if(route && route.component){
		window.history.pushState(
			{},
			route.path,
			window.location.origin + route.path,
		);
		while(root.firstChild){
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



