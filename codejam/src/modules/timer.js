export class Timer {
  constructor(min = 0, sec = 0, minBlock, secBlock) {
    this.minutes = min,
    this.seconds = sec,
    this.minBlock = minBlock,
    this.secBlock = secBlock,
    this.interval;
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
    if (this.seconds <= 9)  {
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
}