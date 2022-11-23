/* eslint-disable no-use-before-define */
import './assets/styles/main-page.scss';
import './assets/styles/game-page.scss';
import './assets/styles/player.scss';
import './assets/styles/bird-card.scss';
import './assets/styles/catalogue-page.scss';
import Header from './scripts/components/header';
import createFooter from './scripts/components/footer';
import createStartPage from './scripts/components/start-page';
import createElem from './scripts/utils/create-element';
import { getHash, Router } from './scripts/router';
import GameView from './scripts/gameView';
import BirdCatalogue from './scripts/components/CataloguePage';

const root = document.getElementById('root');
const headerView = new Header();
const header = headerView.renderHeader();
const footer = createFooter();
const main = createElem('main', 'wrapper main');
const [startGameBtn, startPage] = createStartPage();
startGameBtn.onclick = () => { window.location.hash = '#game'; };
const Game = new GameView();
const gamePage = Game.createGamePage();
const catalogue = new BirdCatalogue();
const cataloguePage = catalogue.createCataloguePage();
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

console.log(`
Cамооценка в соответствии с требованиями ТЗ = 260 баллов:
Вёрстка, дизайн, UI всех трёх страниц приложения +60

Аудиоплеер +30 (кастомный как в демо? + возможность регулирования громкости)

Верхняя панель страницы викторины +20
- правильное отображение счета игры +10
- текущий вопрос выделяется стилем +10

Блок с вопросом +20

Блок с вариантами ответов (названия птиц) +60
- цветовая индикация правильного/неправильного ответа в виде индикаторов разного цвета рядом с названием птицы: +10
- звуковая индикация правильного/неправильного ответа: +30
- при выборе правильного или неправильного ответа издаются разные звуковые сигналы: +10
- при выборе неправильного ответа проигрывание аудиоплеера не должно останавливаться: +10
- при выборе правильно ответа проигрывание аудиоплеера должно остановиться: +10
- при клике по названию птицы в блоке с описанием птицы отображается информацию о ней: +10
- если правильный ответ уже дан, возможность просматривать описания птиц при клике по вариантам ответов остаётся, цвет индикаторов при этом не изменяется: +10

Блок с описанием птицы: +30

- пока игрок не кликнул по названию птицы из списка, в блоке выводится короткий текст с предложением послушать плеер и выбрать название птицы, чей голос прозвучал +10
- при клике по названию птицы из списка, в блоке с описанием птицы появляется актуальная информация о ней +20

Кнопка перехода к следующему вопросу +30
- пока не выбран правильный ответ, кнопка не активна, нет возможности перейти к следующему заданию. Активное и неактивное состояние кнопки визуально отличаются +10
- после правильного ответа на последний вопрос игрок переходит к странице с результатами викторины (по кнопке Далее как в демо) +10
- страница с результатами содержит количество набранных баллов и кнопку с предложением сыграть ещё раз +10

Extra scope +10
- создание галереи всех птиц приложения c информацией о них (фото, аудио, название, описание) +10
`);
