export default function createHeader() {
  const Header = document.createElement('header');
  Header.className = 'header-container';
  const Title = document.createElement('h1');
  Title.innerHTML = '15 Gem Puzzle';
  const Menu = document.createElement('div');

  Header.append(Title);
  Header.append(Menu);
  document.body.prepend(Header);
}
