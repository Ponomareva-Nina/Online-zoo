import '../../assets/styles/normalize.css';
import '../../assets/styles/donate.scss';
import '../../assets/styles/donate-adaptive.scss';
import toggleMenu from '../../modules/menu';

// === BURGER MENU ===
const BurgerBtn = document.querySelector('.burger-menu');
const Menu = document.querySelector('.main-nav');
BurgerBtn.addEventListener('click', () => toggleMenu(BurgerBtn, Menu));
// === /BURGER MENU ===
