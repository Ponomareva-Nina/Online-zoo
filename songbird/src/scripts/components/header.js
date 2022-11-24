import createElem from '../utils/create-element';
import logo from '../../assets/images/logo.svg';
import { getLangContent } from './translation';

export default class Header {
  constructor(root) {
    this.root = root;
    this.lang = getLangContent();
    this.linkMain = createElem('a');
    this.linkGame = createElem('a');
    this.linkCatalogue = createElem('a');
    this.activeLink;
    this.menuBtn = createElem('div', 'burger-btn');
    this.nav = createElem('ul', 'main-nav');
    this.langBtnRu = createElem('button', 'lang-btn', 'ru');
    this.langBtnEn = createElem('button', 'lang-btn', 'en');
  }

  getLangButtons() {
    return [this.langBtnEn, this.langBtnRu];
  }

  setActiveLangBtn() {
    const currentLang = localStorage.getItem('language');
    if (currentLang === 'en') {
      this.langBtnEn.classList.add('lang-btn_active');
    } else {
      this.langBtnRu.classList.add('lang-btn_active');
    }
  }

  changeLanguage(lang) {
    if (lang.language === 'en') {
      this.langBtnRu.classList.remove('lang-btn_active');
      this.langBtnEn.classList.add('lang-btn_active');
    } else {
      this.langBtnRu.classList.add('lang-btn_active');
      this.langBtnEn.classList.remove('lang-btn_active');
    }
    this.linkMain.textContent = lang.menuMain;
    this.linkGame.textContent = lang.menuGame;
    this.linkCatalogue.textContent = lang.menuCatalogue;
  }

  updateActiveLink(a) {
    if (this.activeLink) this.activeLink.classList.remove('active-link');
    this.activeLink = a;
    this.activeLink.classList.add('active-link');
  }

  toggleMenu() {
    this.nav.classList.toggle('main-nav_opened');
    document.body.classList.toggle('inactive');

    window.addEventListener('click', (elem) => {
      if (this.nav.classList.contains('main-nav_opened')) {
        const { target } = elem;

        if ((!target.closest('.main-nav') && !target.closest('.burger-btn')) || (target.closest('.nav-link'))) {
          this.nav.classList.remove('main-nav_opened');
          document.body.classList.remove('inactive');
        }
      }
    });
  }

  renderHeader(root) {
    const header = createElem('header', 'header');
    const logoContainer = createElem('div', 'logo');
    const img = createElem('img');
    img.setAttribute('src', logo);
    img.setAttribute('alt', '');
    const title = createElem('h1', '', 'Songbird');
    logoContainer.append(img, title);
    this.menuBtn.addEventListener('click', () => this.toggleMenu());

    const liMain = createElem('li', 'nav-link');
    const liGame = createElem('li', 'nav-link');
    const liCatalogue = createElem('li', 'nav-link');
    this.linkMain.textContent = this.lang.menuMain;
    this.linkMain.setAttribute('href', '#start');
    this.linkMain.addEventListener('click', () => { this.updateActiveLink(this.linkMain); });
    liMain.append(this.linkMain);

    this.linkGame.textContent = this.lang.menuGame;
    this.linkGame.setAttribute('href', '#game');
    this.linkGame.addEventListener('click', () => { this.updateActiveLink(this.linkGame); });
    liGame.append(this.linkGame);

    this.linkCatalogue.textContent = this.lang.menuCatalogue;
    this.linkCatalogue.setAttribute('href', '#catalogue');
    this.linkCatalogue.addEventListener('click', () => { this.updateActiveLink(this.linkCatalogue); });
    liCatalogue.append(this.linkCatalogue);

    this.setActiveLangBtn();
    this.nav.append(liMain, liGame, liCatalogue);
    const languages = createElem('div', 'lang-panel');
    languages.append(this.langBtnRu, this.langBtnEn);
    this.nav.append(languages);
    header.append(logoContainer, this.nav, this.menuBtn);
    root.append(header);
  }
}
