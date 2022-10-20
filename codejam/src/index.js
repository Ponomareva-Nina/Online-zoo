import './assets/styles/normalize.css';
import './assets/styles/index.scss';
import GameField from './modules/game-field';
import createControls from './modules/controls-layout';
import createHeader from './modules/header-layout';
import moveTile from './modules/move-tiles';

const Main = document.createElement('main');
const Controls = createControls();
const FieldContainer = document.createElement('div');
FieldContainer.className = 'field-container';

window.onload = () => {
  createHeader();
  document.body.append(Main);
  Main.append(Controls);
  Main.append(FieldContainer);

  const StartBtn = document.querySelector('.start-btn');
  const SaveBtn = document.querySelector('.save-btn');
  const ResultsBtn = document.querySelector('.save-btn');
  StartBtn.addEventListener('click', () => startGame(FieldContainer, 4));
};

const welcomeText = '<div class="welcome-text"><h2>Welcome to the gem puzzle!</h2><p>The goal of the game is to place numbered tiles in order</p><h3>Game controls:</h3><ol><li>To start a new game press NEW GAME</li><li>To save current game press SAVE</li><li>To see your top 10 results press BEST RESULTS</li><li>To move a tile simply click on it or drag it</li></ol><p><b>All combinations in this game are solvable</b></p></div>';
FieldContainer.insertAdjacentHTML('afterbegin', welcomeText);

function startGame(fieldContainer, size) {
  const Field = new GameField(size);
  Field.generateTiles();
  Field.randomizeTiles();
  Field.renderField(fieldContainer);
  fieldContainer.addEventListener('pointerdown', (event) => {
   moveTile(event);
  });
}