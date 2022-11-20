/* eslint-disable no-use-before-define */
import './assets/styles/main-page.scss';
import './assets/styles/game-page.scss';
import './assets/styles/player.scss';
import Header from './scripts/components/header';
import createFooter from './scripts/components/footer';
import createStartPage from './scripts/components/start-page';
import createElem from './scripts/utils/create-element';
import { getHash, Router } from './scripts/router';
import GameView from './scripts/gameView';

const root = document.getElementById('root');
const headerView = new Header();
const header = headerView.renderHeader();
const footer = createFooter();
const main = createElem('main', 'wrapper main');
const [startGameBtn, startPage] = createStartPage();
startGameBtn.onclick = () => { window.location.hash = '#game'; };
const Game = new GameView();
const gamePage = Game.createGamePage();
const cataloguePage = 'cataloguePage';
const Route = new Router(main, startPage, gamePage, cataloguePage);

root.append(header, main, footer);

window.addEventListener('hashchange', () => {
  updateRoute();
});

window.addEventListener('load', () => {
  updateRoute();
});

function updateRoute() {
  Route[`${getHash()}Route`]();
  headerView.updateActiveLink(document.querySelector(`a[href="#${getHash()}"]`));
}
