import './assets/styles/normalize.css';
import './assets/styles/index.scss';
import { createElem, createBtn, createEndGameMessage } from './modules/service';
import createNewTimer from './modules/Timer';
import Field from './modules/Field';
import { createHeader } from './modules/header';
import { continueGame, saveGame } from './modules/storage';

const Main = createElem('main', 'main');
const FieldContainer = createElem('div', 'field-container');
const welcomeText = '<div class="welcome-text"><h2>Welcome to the gem puzzle!</h2> <p>The goal of the game is to place numbered tiles in order</p> <h3>Game controls:</h3><ol><li>To start a new game press NEW GAME</li><li>To save current game press SAVE</li><li>To continue saved game press CONTINUE</li><li>To see your top 10 results press BEST RESULTS</li></ol><h3>All combinations in this game are solvable</h3></div>';
FieldContainer.insertAdjacentHTML('afterbegin', welcomeText);
const Header = createHeader();

// === CREATE SIZE BUTTONS: ===
const SizePanel = createElem('div', 'size-controls');
let checkedSizeBtn;
for (let i = 3; i <= 8; i++) {
  const sizeBtn = createBtn(`${i}&times;${i}`, 'size-btn', `${i}`);
  sizeBtn.addEventListener('click', () => changeSize(sizeBtn));
  SizePanel.append(sizeBtn);
  if (i === 4) {
    sizeBtn.classList.add('size-btn_checked');
    checkedSizeBtn = sizeBtn;
  }
}

//  ===  CREATE GAME CONTROLS: ===
const Controls = createElem('div', 'controls');
const StartBtn = createBtn('new game', 'btn start-btn');
const SaveBtn = createBtn('save', 'btn save-btn');
const ContinueBtn = createBtn('continue', 'btn continue-btn');
const ResultsBtn = createBtn('best results', 'btn results-btn');
Controls.append(StartBtn, SaveBtn, ContinueBtn, ResultsBtn);

// ===  CREATE STATUS PANEL: ===
const StatusPanel = createElem('div', 'status-panel');
const TimeCounter = createElem('div', 'time-container', 'Time:&nbsp;');
let Time = createNewTimer(0, 0, TimeCounter);
const MovesCounter = createElem('div', '', 'Moves:&nbsp;0');
StatusPanel.append(MovesCounter, TimeCounter);

// === APPEND ELEMENTS AND ADD LISTENERS ===
Main.append(Header, Controls, StatusPanel, FieldContainer, SizePanel);
document.body.append(Main);
let GameField = new Field(checkedSizeBtn.value);
StartBtn.addEventListener('click', () => startGame(checkedSizeBtn.value));
ContinueBtn.addEventListener('click', () => {
  const [field, time] = continueGame(FieldContainer, MovesCounter, TimeCounter);
  GameField = field;
  Time = time;
});
SaveBtn.addEventListener('click', () => {
  saveGame(GameField, Time);
});
FieldContainer.addEventListener('click', checkIfSolved);

// === FUNCTIONS ===
function changeSize(btn) {
  checkedSizeBtn.classList.remove('size-btn_checked');
  btn.classList.add('size-btn_checked');
  checkedSizeBtn = btn;
  startGame(btn.value);
}

function startGame(size) {
  GameField = new Field(size);
  const Counter = GameField.createMovesCounter();
  MovesCounter.innerHTML = '';
  MovesCounter.append(Counter);
  GameField.generateTiles();
  GameField.randomizeTiles();
  GameField.renderField(FieldContainer);
  Time = createNewTimer(0, 0, TimeCounter);
  Time.startTimer();

  window.addEventListener('resize', () => {
    GameField.renderField(FieldContainer);
  });
}

function checkIfSolved() {
  if (GameField.isSolved()) {
    const count = GameField.getCount();
    const time = Time.getTime();
    endGame();
    createEndGameMessage(count, time, FieldContainer);
    FieldContainer.removeEventListener('click', checkIfSolved);
  }
}

function endGame() {
  Time.stopTimer();
}
