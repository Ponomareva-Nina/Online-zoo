import createElem from '../utils/create-element';
import logo from '../../assets/images/logo.svg';

const navigationLinks = [
  { name: 'Главная', href: '#start' },
  { name: 'Игра', href: '#game' },
  { name: 'Справочник', href: '#catalogue' }];

export default function createHeader() {
  const header = createElem('header', 'header');
  const logoContainer = createElem('div', 'logo');
  const img = createElem('img');
  img.setAttribute('src', logo);
  img.setAttribute('alt', '');
  const title = createElem('h1', '', 'Songbird');
  logoContainer.append(img, title);
  const nav = createElem('ul', 'main-nav');

  for (let i = 0; i < navigationLinks.length; i++) {
    const li = createElem('li');
    const a = createElem('a', '', navigationLinks[i].name);
    a.setAttribute('href', navigationLinks[i].href);

    if (i === 0) { a.className = 'active-link'; }
    li.append(a);
    nav.append(li);
  }

  header.append(logoContainer, nav);
  return header;
}
