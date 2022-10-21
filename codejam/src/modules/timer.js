let minutes = 0;
let seconds = 0;
let interval;

export function clearTimer(minBlock, secBlock) {
  minBlock.innerHTML = '00';
  secBlock.innerHTML = '00';
  minutes = 0;
  seconds = 0;
}

export function countTime(minBlock, secBlock) {
  seconds++;
  if (seconds <= 9)  {
    secBlock.innerHTML = `0${seconds}`;
  } else {
    secBlock.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    seconds = 0;
    minBlock.innerHTML = minutes;
  }
}

export function startTimer(minBlock, secBlock) {
  clearInterval(interval);
  interval = setInterval(() => countTime(minBlock, secBlock), 1000);
}

