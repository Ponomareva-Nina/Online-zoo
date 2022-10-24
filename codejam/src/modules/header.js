const audio = require('../assets/audio/click.mp3')
const myAudio = new Audio(audio);

const SoundBtn = document.createElement('button');

export function createHeader() {
  const Header = document.createElement('header');
  Header.className = 'header-container';
  const Title = document.createElement('h1');
  Title.innerHTML = '15 Gem Puzzle';
  SoundBtn.className = 'audio';

  Header.append(Title);
  Header.append(SoundBtn);

  SoundBtn.addEventListener('click', () => {
    SoundBtn.classList.toggle('audio_disabled');
  })
  return Header;
}

export function playAudio() {
  if (!SoundBtn.classList.contains('audio_disabled'))
  myAudio.play();
}