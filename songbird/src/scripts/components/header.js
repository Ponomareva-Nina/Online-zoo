import createElem from '../utils/create-element';
import logo from '../../assets/images/logo.svg';

export default class Header {
  constructor() {
    this.routes = [
      { name: 'Главная', href: '#start' },
      { name: 'Игра', href: '#game' },
      { name: 'Справочник', href: '#catalogue' },
    ];
    this.activeLink;
    this.menuBtn = createElem('div', 'burger-btn');
    this.nav = createElem('ul', 'main-nav');
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

  renderHeader() {
    const header = createElem('header', 'header');
    const logoContainer = createElem('div', 'logo');
    const img = createElem('img');
    img.setAttribute('src', logo);
    img.setAttribute('alt', '');
    const title = createElem('h1', '', 'Songbird');
    logoContainer.append(img, title);
    this.menuBtn.addEventListener('click', () => this.toggleMenu());

    this.routes.forEach((route) => {
      const li = createElem('li', 'nav-link');
      const a = createElem('a', '', route.name);
      a.setAttribute('href', route.href);
      a.addEventListener('click', () => { this.updateActiveLink(a); });
      li.append(a);
      this.nav.append(li);
    });

    header.append(logoContainer, this.nav, this.menuBtn);
    return header;
  }
}
