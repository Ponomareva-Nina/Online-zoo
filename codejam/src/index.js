import './assets/styles/normalize.css';
import './assets/styles/index.scss';
import GameField from './modules/game-field';
import createControls from './modules/controls-layout';
import createHeader from './modules/header';

const Main = document.createElement('main');
const Controls = createControls();
const FieldContainer = document.createElement('div');
FieldContainer.className = 'field-container';

window.onload = () => {
  createHeader();
  document.body.append(Main);
  Main.append(Controls);
  Main.append(FieldContainer);
};


const Field = new GameField(4);
Field.generateTiles();
Field.randomizeTiles();
Field.renderField(FieldContainer);
