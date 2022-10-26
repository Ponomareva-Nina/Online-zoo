import Field from './Field';
import createNewTimer from './Timer';

export function saveGame(field, time) {
  const tiles = field.getTiles();
  const tilesArr = JSON.stringify(tiles);
  const moves = field.getCount();
  const size = field.getFieldSize();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  const winCombination = field.successCombination;

  localStorage.setItem('currentTilesPosition', tilesArr);
  localStorage.setItem('moves', moves);
  localStorage.setItem('fieldSize', size);
  localStorage.setItem('minutes', min);
  localStorage.setItem('seconds', sec);
  localStorage.setItem('winCombination', winCombination);
}

export function continueGame(fieldContainer, movesCount, TimeContainer) {
  if (localStorage.getItem('currentTilesPosition') == null) {
    alert('There is no saved game!');
  } else {
    const tilesArr = localStorage.getItem('currentTilesPosition');
    const tiles = JSON.parse(tilesArr);
    const moves = localStorage.getItem('moves');
    const fieldSize = localStorage.getItem('fieldSize');
    const minutes = localStorage.getItem('minutes');
    const seconds = localStorage.getItem('seconds');
    const winCombination = localStorage.getItem('winCombination');
    fieldContainer.innerHTML = '';

    const GameField = new Field(fieldSize);
    GameField.moves = moves;
    const Counter = GameField.createMovesCounter();
    movesCount.innerHTML = '';
    movesCount.append(Counter);
    GameField.tiles = tiles;
    GameField.successCombination = winCombination;
    GameField.renderField(fieldContainer);
    const Time = createNewTimer(minutes, seconds, TimeContainer);
    Time.startTimer();
  }
}
