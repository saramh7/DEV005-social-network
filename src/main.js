import Login from './components/Login.js';
import Error from './components/Error.js';
import Register from './components/Register.js';
import Home from './components/Home.js';

const routes = [
  { path: '/', components: Login },
  { path: '/register', components: Register },
  { path: '/home', components: Home },
  { path: '/error', components: Error },
];

const defaultRoute = '/';
const root = document.getElementById('root');

function navigateTo(hash) {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.components) {
    window.history.pushState(
      {},
      hash,
      window.location.origin + hash,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.components(navigateTo));
  } else {
    navigateTo('/error');
  }
}

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
