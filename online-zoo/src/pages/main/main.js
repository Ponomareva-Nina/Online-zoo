import '../../assets/styles/normalize.css';
import '../../assets/styles/index.scss';
import '../../assets/styles/index-adaptive.scss';
import '../../assets/styles/popup.scss';
import toggleMenu from '../../modules/menu';
import togglePopup from '../../modules/feedback-popup';

// === BURGER MENU ===
const BurgerBtn = document.querySelector('.burger-menu');
const Menu = document.querySelector('.main-nav');
BurgerBtn.addEventListener('click', () => toggleMenu(BurgerBtn, Menu));
// === /BURGER MENU ===

// === FEEDBACK POPUP ===
const feedbackCards = document.querySelectorAll('.feedback-card');
feedbackCards.forEach((feedback) => {
  feedback.addEventListener('click', () => togglePopup(feedback));
});
// === /FEEDBACK POPUP ===
