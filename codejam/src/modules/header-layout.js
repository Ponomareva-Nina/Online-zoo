export default function createHeader() {
  const Header = document.createElement('header');
  Header.className = 'header-container';
  const Title = document.createElement('h1');
  Title.innerHTML = '15 Gem Puzzle';
  const SoundBtn = document.createElement('div');
  SoundBtn.innerHTML = 'sound';

  Header.append(Title);
  Header.append(SoundBtn);
  document.body.prepend(Header);
}
