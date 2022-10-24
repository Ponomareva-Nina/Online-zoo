import GameField from './Field';
import { countMoves, moveTile } from './app';
import { Timer } from './Timer';

function createJsonObj(obj){
  const JsonObj = {};
  for (let i = 0; i < obj.length; i++){
    JsonObj[i] = obj[i].outerHTML;
  }
  return JsonObj;
}

export function saveToStorage(obj, moves, min, sec, size) {
  let currentState = createJsonObj(obj);
  let str = JSON.stringify(currentState);
  localStorage.setItem('currentGame', str);
  localStorage.setItem('moves', moves);
  localStorage.setItem('min', min);
  localStorage.setItem('sec', sec);
  localStorage.setItem('size', size);
}

export function continueSavedGame(fieldContainer, movesCount) {
  if (localStorage.getItem('currentGame') == null) {
    return
  }

  let moves = localStorage.getItem('moves');
  let size = localStorage.getItem('size');
  let tileSize = Math.ceil(fieldContainer.clientWidth / size);
  let Field = new GameField(size, tileSize, moves);
  movesCount.innerHTML = Field.getMoves();

  let str = localStorage.getItem('currentGame');
  let JsonObj = JSON.parse(str);
  let length = Object.keys(JsonObj).length;
  fieldContainer.innerHTML = '';

  for (let i = 0; i < length; i++){
    fieldContainer.insertAdjacentHTML('afterbegin', JsonObj[i]);
  }

  fieldContainer.addEventListener('pointerdown', moveTile);
  fieldContainer.addEventListener('pointerdown', (event) => {
    countMoves(event, Field, movesCount);
  });

}

