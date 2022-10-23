import './assets/styles/normalize.css';
import './assets/styles/index.scss';
import GameField from './modules/Field';
import createHeader from './modules/header-layout';
import { countMoves, createBtn, moveTile } from './modules/app';
import { startTimer, clearTimer } from './modules/Timer';
import { renderGameFromStorage, saveToStorage } from './modules/storage';

const Main = document.createElement('main');
const FieldContainer = document.createElement('div');
FieldContainer.className = 'field-container';

// cоздаем кнопки управления:
const Controls = document.createElement('div');
Controls.className = 'controls';
const StartBtn = createBtn('new game', 'btn start-btn');
const SaveBtn = createBtn('save', 'btn save-btn');
const ContinueBtn = createBtn('continue', 'btn continue-btn');
const ResultsBtn = createBtn('best results', 'btn results-btn');
Controls.append(StartBtn, SaveBtn, ContinueBtn, ResultsBtn);

// cоздаем статус-бар (счетчик и таймер игры):
const StatusPanel = document.createElement('div');
StatusPanel.className = 'status-panel';

const Moves = document.createElement('div');
Moves.insertAdjacentHTML('afterbegin', '<span>Moves: </span> <span class="moves-counter">0</span>');
const Timer = document.createElement('div');
Timer.insertAdjacentHTML('afterbegin', '<span>Time: </span> <span class="min-counter">00</span>:<span class="sec-counter">00</span>');
StatusPanel.append(Moves);
StatusPanel.append(Timer);

// создаем кнопки с размерами поля:
const SizePanel = document.createElement('div');
SizePanel.className = 'size-controls'
for (let i = 3; i <= 8; i++) {
  let sizeBtn = createBtn(`${i}&times;${i}`, 'size-btn');
  SizePanel.append(sizeBtn);
  if (i === 4){sizeBtn.classList.add('size-btn_checked')}
}

window.onload = () => {
  createHeader();
  document.body.append(Main);
  Main.append(Controls);
  Main.append(StatusPanel);
  Main.append(FieldContainer);
  Main.append(SizePanel);

  const SizeBtns = document.querySelectorAll('.size-btn');
  let checkedSize = document.querySelector('.size-btn_checked');
  let fieldSize = document.querySelector('.size-btn_checked').innerHTML.charAt(0);
  StartBtn.addEventListener('click', () => startGame(FieldContainer, fieldSize));

  for (let sizeBtn of SizeBtns) {
    sizeBtn.addEventListener('click', () => {
      checkedSize.classList.remove('size-btn_checked');
      checkedSize = sizeBtn;
      sizeBtn.classList.add('size-btn_checked');
      fieldSize = sizeBtn.innerHTML.charAt(0);
      startGame(FieldContainer, fieldSize);
    })
  }

  // save to Local Storage by click on Save button
  SaveBtn.addEventListener('click', () => {
  const Tiles = document.querySelectorAll('.tile');
    saveToStorage(Tiles);
  });

  //render saved game by click on Continue button
  ContinueBtn.addEventListener('click', () => {
    if (localStorage.getItem('currentGame') !== null){
      renderGameFromStorage(FieldContainer);
    }
  })
};


const welcomeText = '<div class="welcome-text"><h2>Welcome to the gem puzzle!</h2><p>The goal of the game is to place numbered tiles in order</p><h3>Game controls:</h3><ol><li>To start a new game press NEW GAME</li><li>To save current game press SAVE</li><li>To see your top 10 results press BEST RESULTS</li><li>To move a tile simply click on it or drag it</li></ol><h3>All combinations in this game are solvable</h3></div>';
FieldContainer.insertAdjacentHTML('afterbegin', welcomeText);

function startGame(fieldContainer, size) {
  let tileSize = Math.ceil(fieldContainer.clientWidth / size);
  const sec = document.querySelector('.sec-counter');
  const min = document.querySelector('.min-counter');
  const MovesField = document.querySelector('.moves-counter');
  const Field = new GameField(size, tileSize);
  MovesField.innerHTML = Field.getMoves();
  Field.generateTiles();
  Field.randomizeTiles();
  Field.renderField(fieldContainer);
  fieldContainer.addEventListener('pointerdown', moveTile);
  fieldContainer.addEventListener('pointerdown', (event) => {
    countMoves(event, Field, MovesField);
  });
  clearTimer(min, sec)
  startTimer(min, sec);

  window.addEventListener('resize', () => {
    let tileSize = Math.ceil(fieldContainer.clientWidth / size);
    Field.tileSize = tileSize;
    Field.renderField(fieldContainer);
  });
}