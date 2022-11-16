import './assets/styles/main.scss';
import createHeader from './scripts/components/header';
import logo from './assets/images/logo.svg';
import createFooter from './scripts/components/footer';
import createStartPage from './scripts/components/start-page';
import createElem from './scripts/utils/create-element';

const root = document.getElementById('root');
const header = createHeader(logo, 'Songbird', ['Главная', 'Игра', 'Справочник']);
const footer = createFooter();
const main = createElem('main', 'wrapper main');
const startPage = createStartPage();

main.append(startPage);
root.append(header, main, footer);
