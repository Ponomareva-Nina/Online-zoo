import createElem from '../utils/create-element';

export default class AudioPlayer {
  constructor(song) {
    this.isOn = false;
    this.audio = new Audio(song);
    this.playBtn = createElem('button', 'player-btn player-btn_play');
    this.audioContainer = createElem('div', 'player-container');
  }

  setSong(song) {
    this.audio = new Audio(song);
  }

  play() {
    this.isOn = true;
    if (this.audio) {
      this.audio.play();
    }
  }

  pause() {
    this.isOn = false;
    if (this.audio) {
      this.audio.pause();
    }
  }

  showPauseBtn() {
    this.playBtn.classList.remove('player-btn_play');
    this.playBtn.classList.add('player-btn_pause');
  }

  showPlayBtn() {
    this.playBtn.classList.remove('player-btn_pause');
    this.playBtn.classList.add('player-btn_play');
  }

  createPlayer() {
    this.playBtn.addEventListener('click', () => {
      if (this.isOn) {
        this.pause();
        this.showPlayBtn();
      } else {
        this.play();
        this.showPauseBtn();
      }
    });

    this.audioContainer.append(this.playBtn);
    return this.audioContainer;
  }
}
