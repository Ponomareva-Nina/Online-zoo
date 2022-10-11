import '../../assets/styles/normalize.css';
import '../../assets/styles/donate.scss';
import '../../assets/styles/donate-adaptive.scss';
import toggleMenu from '../../modules/menu';

// === BURGER MENU ===
const BurgerBtn = document.querySelector('.burger-menu');
const Menu = document.querySelector('.main-nav');
BurgerBtn.addEventListener('click', () => toggleMenu(BurgerBtn, Menu));
// === /BURGER MENU ===

// === AMOUNT BAR ===
const AmountInput = document.querySelector('#amount');
const AmountBar = document.querySelectorAll('.amount-bar__radio-input');

function limitInput() {
  if (this.value.length >= 5) {
    this.value = this.value.substring(0, 4);
  }
  if (this.value.includes('e')) {
    this.value.replace(/[e]/, '');
  }
}

function changeAmountInput(amountBarValue, amountInput) {
  // eslint-disable-next-line no-param-reassign
  amountInput.value = amountBarValue.value;
}

function changeAmountBar(amountBar, amountInput) {
  amountBar.forEach((el) => {
    if (el.value === amountInput.value) {
      // eslint-disable-next-line no-param-reassign
      el.checked = true;
    } else {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    }
  });
}

AmountInput.addEventListener('input', limitInput);
AmountInput.addEventListener('input', () => { changeAmountBar(AmountBar, AmountInput); });
AmountBar.forEach((el) => el.addEventListener('click', () => { changeAmountInput(el, AmountInput); }));

// === AMOUNT BAR ===
