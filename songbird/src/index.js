import './assets/styles/main.scss';
import createHeader from './scripts/components/header';
import logo from './assets/images/logo.svg';
import createFooter from './scripts/components/footer';

const root = document.getElementById('root');
const header = createHeader(logo, 'Songbird', ['Главная', 'Игра', 'Справочник']);
const footer = createFooter();
root.append(header, footer);
