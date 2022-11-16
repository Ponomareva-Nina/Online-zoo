import './assets/styles/main.scss';
import createHeader from './scripts/components/header';
import createFooter from './scripts/components/footer';
import createStartPage from './scripts/components/start-page';
import createElem from './scripts/utils/create-element';
import { getHash, Router } from './scripts/router';

const root = document.getElementById('root');
const header = createHeader();
const footer = createFooter();
const main = createElem('main', 'wrapper main');
const startPage = createStartPage();
const gamePage = 'gamePage';
const cataloguePage = 'cataloguePage';
const Route = new Router(main, startPage, gamePage, cataloguePage);

root.append(header, main, footer);

window.addEventListener('hashchange', () => {
  Route[`${getHash()}Route`]();
});

window.addEventListener('load', () => {
  Route[`${getHash()}Route`]();
});
