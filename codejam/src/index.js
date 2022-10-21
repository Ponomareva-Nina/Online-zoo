import './assets/styles/normalize.css';
import './assets/styles/index.scss';
import GameField from './modules/Field';
import { createControls, createSizeControls, createStatusPanel } from './modules/controls-layout';
import createHeader from './modules/header-layout';
import { moveTile, countMoves } from './modules/game-functions';
import { startTimer, clearTimer } from './modules/timer';

const Main = document.createElement('main');
const Controls = createControls();
const FieldContainer = document.createElement('div');
FieldContainer.className = 'field-container';
const SizePanel = createSizeControls();
const StatusPanel = createStatusPanel();

window.onload = () => {
  createHeader();
  document.body.append(Main);
  Main.append(Controls);
  Main.append(StatusPanel);
  Main.append(FieldContainer);
  Main.append(SizePanel);

  const StartBtn = document.querySelector('.start-btn');
  const SaveBtn = document.querySelector('.save-btn');
  const ResultsBtn = document.querySelector('.save-btn');
  StartBtn.addEventListener('click', () => startGame(FieldContainer, 6));
};

const welcomeText = '<div class="welcome-text"><h2>Welcome to the gem puzzle!</h2><p>The goal of the game is to place numbered tiles in order</p><h3>Game controls:</h3><ol><li>To start a new game press NEW GAME</li><li>To save current game press SAVE</li><li>To see your top 10 results press BEST RESULTS</li><li>To move a tile simply click on it or drag it</li></ol><h3>All combinations in this game are solvable</h3></div>';
FieldContainer.insertAdjacentHTML('afterbegin', welcomeText);

function startGame(fieldContainer, size) {
  let tileSize = fieldContainer.clientWidth / size;
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
    let tileSize = FieldContainer.clientWidth / size;
    Field.tileSize = tileSize;
    Field.renderField(FieldContainer);
  });
}