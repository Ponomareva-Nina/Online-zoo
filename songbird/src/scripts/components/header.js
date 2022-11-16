import createElem from '../utils/create-element';

export default function createHeader(logoImg, logoName, navigationLinks) {
  const header = createElem('header', 'header');
  const logo = createElem('div', 'logo');
  const img = createElem('img');
  img.setAttribute('src', logoImg);
  img.setAttribute('alt', '');
  const title = createElem('h1', '', logoName);
  logo.append(img, title);
  const nav = createElem('ul', 'main-nav');

  for (let i = 0; i < navigationLinks.length; i++) {
    const li = createElem('li');
    const a = createElem('a', '', navigationLinks[i]);
    a.setAttribute('href', '#');
    if (i === 0) { a.className = 'active-link'; }
    li.append(a);
    nav.append(li);
  }

  header.append(logo, nav);
  return header;
}
