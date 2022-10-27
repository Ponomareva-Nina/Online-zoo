class Timer {
  constructor(min = 0, sec = 0) {
    this.minutes = min;
    this.seconds = sec;
    this.minBlock;
    this.secBlock;
    this.interval;
  }

  createMinContainer() {
    const minContainer = document.createElement('div');
    if (this.minutes <= 9) {
      minContainer.innerHTML = `0${this.minutes}`;
    } else { minContainer.innerHTML = this.minutes; }
    this.minBlock = minContainer;
    return minContainer;
  }

  createSecContainer() {
    const secContainer = document.createElement('div');
    if (this.seconds <= 9) {
      secContainer.innerHTML = `0${this.seconds}`;
    } else { secContainer.innerHTML = this.seconds; }
    this.secBlock = secContainer;
    return secContainer;
  }

  clearTimer() {
    this.minBlock.innerHTML = '00';
    this.secBlock.innerHTML = '00';
    clearInterval(this.interval);
    this.minutes = 0;
    this.seconds = 0;
  }

  countTime() {
    this.seconds++;
    if (this.seconds <= 9) {
      this.secBlock.innerHTML = `0${this.seconds}`;
    } else {
      this.secBlock.innerHTML = this.seconds;
    }
    if (this.seconds > 59) {
      this.minutes++;
      this.seconds = 0;
      this.minBlock.innerHTML = this.minutes;
    }
  }

  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.countTime(), 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getTime() {
    let minutes = this.getMinutes();
    if (minutes <= 9) { minutes = `0${minutes}`; }
    let seconds = this.getSeconds();
    if (seconds <= 9) { seconds = `0${seconds}`; }
    return `${minutes}:${seconds}`;
  }

  getMinutes() {
    return this.minutes;
  }

  getSeconds() {
    return this.seconds;
  }
}

export default function createNewTimer(min, sec, timeContainer) {
  const Time = new Timer(min, sec);
  timeContainer.innerHTML = 'Time:&nbsp;';
  const SecCount = Time.createSecContainer();
  const MinCount = Time.createMinContainer();
  MinCount.className = 'min-counter';
  timeContainer.append(MinCount, SecCount);
  return Time;
}
