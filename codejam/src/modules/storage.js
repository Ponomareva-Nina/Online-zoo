import GameField from './Field';
import { countMoves, moveTile } from './app';

function createJsonObj(obj) {
  const JsonObj = {};
  for (let i = 0; i < obj.length; i++) {
    JsonObj[i] = obj[i].outerHTML;
  }
  return JsonObj;
}

export function saveToStorage(obj, moves, min, sec, size) {
  const currentState = createJsonObj(obj);
  const str = JSON.stringify(currentState);
  localStorage.setItem('currentGame', str);
  localStorage.setItem('moves', moves);
  localStorage.setItem('min', min);
  localStorage.setItem('sec', sec);
  localStorage.setItem('size', size);
}

export function continueSavedGame(fieldContainer, movesCount) {
  if (localStorage.getItem('currentGame') == null) {
    return;
  }

  const moves = localStorage.getItem('moves');
  const size = localStorage.getItem('size');
  const tileSize = Math.ceil(fieldContainer.clientWidth / size);
  const Field = new GameField(size, tileSize, moves);
  movesCount.innerHTML = Field.getMoves();

  const str = localStorage.getItem('currentGame');
  const JsonObj = JSON.parse(str);
  const { length } = Object.keys(JsonObj);
  fieldContainer.innerHTML = '';

  for (let i = 0; i < length; i++) {
    fieldContainer.insertAdjacentHTML('afterbegin', JsonObj[i]);
  }

  fieldContainer.addEventListener('pointerdown', moveTile);
  fieldContainer.addEventListener('pointerdown', (event) => {
    countMoves(event, Field, movesCount);
  });
}
