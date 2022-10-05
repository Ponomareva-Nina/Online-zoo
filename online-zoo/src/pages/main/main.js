import '../../assets/styles/normalize.css';
import '../../assets/styles/index.scss';
import '../../assets/styles/index-adaptive.scss';

import toggleMenu from '../../modules/menu';

const BurgerBtn = document.querySelector('.burger-menu');
const Menu = document.querySelector('.main-nav');

BurgerBtn.addEventListener('click', () => toggleMenu(BurgerBtn, Menu));
