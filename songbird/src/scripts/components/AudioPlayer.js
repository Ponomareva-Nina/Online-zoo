import createElem from '../utils/create-element';

export default class AudioPlayer {
  constructor(song) {
    this.isOn = false;
    this.audio = new Audio(song);
    this.playBtn = createElem('button', 'player-btn player-btn_play');
    this.audioContainer = createElem('div', 'player-container');
    this.progressBar = createElem('div', 'progress-bar');
    this.progressContainer = createElem('div', 'progress-container');
    this.volumeBar = createElem('input', 'volume-bar');
    this.volumeBar.setAttribute('type', 'range');
    this.volumeIcon = createElem('div', 'volume-icon');
  }

  setSong(song) {
    this.audio = new Audio(song);
    this.progressBar.style.width = 0;
  }

  play() {
    this.isOn = true;
    this.audio.addEventListener('timeupdate', (e) => { this.updateProgress(e); });
    if (this.audio) {
      this.audio.play();
      this.showPauseBtn();
    }
  }

  pause() {
    this.isOn = false;
    if (this.audio) {
      this.audio.pause();
      this.showPlayBtn();
    }
  }

  stop() {
    this.isOn = false;
    this.audio.pause();
    this.progressBar.style.width = 0;
    this.showPlayBtn();
    this.audio.currentTime = 0;
  }

  showPauseBtn() {
    this.playBtn.classList.remove('player-btn_play');
    this.playBtn.classList.add('player-btn_pause');
  }

  showPlayBtn() {
    this.playBtn.classList.remove('player-btn_pause');
    this.playBtn.classList.add('player-btn_play');
  }

  updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    this.progressBar.style.width = `${progressPercent}%`;
    if (duration === currentTime) {
      this.stop();
    }
  }

  setProgress(e) {
    const width = this.progressContainer.clientWidth;
    const { duration } = this.audio;
    const clickCoordinates = e.offsetX;
    this.audio.currentTime = (clickCoordinates / width) * duration;
  }

  setVolume() {
    if (this.volumeBar.value === 0) {
      this.mute();
    } else {
      this.volumeIcon.classList.remove('mute-icon');
    }
    const volume = this.volumeBar.value / 100;
    const progress = this.volumeBar.value;
    this.audio.volume = volume;
    this.volumeBar.style.background = `linear-gradient(90deg, #FFBA76 0%, #FFBA76 ${progress}%, transparent ${progress}%, transparent 100% )`;
  }

  mute() {
    this.volumeIcon.classList.add('mute-icon');
    this.audio.volume = 0;
    this.volumeBar.value = 0;
    this.volumeBar.style.background = 'linear-gradient(90deg, transparent 0%, transparent 100% )';
  }

  createPlayer() {
    this.playBtn.addEventListener('click', () => {
      if (this.isOn) {
        this.pause();
      } else {
        this.play();
      }
    });

    const volumeContainer = createElem('div', 'volume-bar-container');
    volumeContainer.append(this.volumeIcon, this.volumeBar);
    this.volumeIcon.addEventListener('click', () => this.mute());
    this.volumeBar.addEventListener('input', () => this.setVolume());
    this.progressContainer.addEventListener('click', (e) => this.setProgress(e));
    this.progressContainer.append(this.progressBar);
    this.audioContainer.append(this.playBtn, this.progressContainer, volumeContainer);
    return this.audioContainer;
  }
}
