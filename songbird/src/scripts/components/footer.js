import createElem from '../utils/create-element';

export default function createFooter() {
  const footer = createElem('footer', 'footer');
  const rsLink = createElem('a');
  rsLink.setAttribute('href', 'https://rs.school');
  const rsImg = createElem('img');
  rsImg.setAttribute('src', './assets/images/rs-school.png');
  rsImg.setAttribute('alt', 'RS School');
  rsLink.append(rsImg);

  const copyright = createElem('div', 'copyright');
  const designed = createElem('a', '', '&copy; Designed by');
  designed.setAttribute('href', 'https://www.figma.com/file/bqF4iOiTfYa0FyhUn0y3MO/Songbird?node-id=0%3A1&t=vbYYipW9y8LNkSIm-1');
  const github = createElem('a', 'github-link', 'Ponomareva-Nina');
  github.setAttribute('href', 'https://github.com/Ponomareva-Nina');
  const githubImg = createElem('img');
  githubImg.setAttribute('src', './assets/images/github-icon.svg');
  githubImg.setAttribute('alt', 'Github:');
  github.prepend(githubImg);
  copyright.append(designed, github);
  footer.append(rsLink, copyright);
  return footer;
}
