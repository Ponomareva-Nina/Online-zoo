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
  }

  updateActiveLink(a) {
    if (this.activeLink) this.activeLink.classList.remove('active-link');
    this.activeLink = a;
    this.activeLink.classList.add('active-link');
  }

  renderHeader() {
    const header = createElem('header', 'header');
    const logoContainer = createElem('div', 'logo');
    const img = createElem('img');
    img.setAttribute('src', logo);
    img.setAttribute('alt', '');
    const title = createElem('h1', '', 'Songbird');
    logoContainer.append(img, title);
    const nav = createElem('ul', 'main-nav');

    this.routes.forEach((route) => {
      const li = createElem('li');
      const a = createElem('a', '', route.name);
      a.setAttribute('href', route.href);
      a.addEventListener('click', () => { this.updateActiveLink(a); });
      li.append(a);
      nav.append(li);
    });

    header.append(logoContainer, nav);
    return header;
  }
}
