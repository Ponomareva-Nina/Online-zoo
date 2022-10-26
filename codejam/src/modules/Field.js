import { playAudio } from './header';

export default class Field {
  constructor(size, moves = 0) {
    this.moves = moves;
    this.movesCounter;
    this.fieldSize = size;
    this.tiles = [];
    this.successCombination = [];
  }

  createMovesCounter() {
    const Moves = document.createElement('div');
    const Counter = document.createElement('span');
    Moves.innerText = 'Moves: ';
    this.movesCounter = Counter;
    Counter.innerHTML = this.moves;
    Moves.append(Counter);
    return Moves;
  }

  countMoves() {
    this.moves++;
    this.movesCounter.innerHTML = this.moves;
  }

  getCount() {
    return this.moves;
  }

  generateTiles() {
    for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
      if (i !== 0) { this.successCombination.push(i); }
      this.tiles.push({
        value: i,
        posLeft: (i % this.fieldSize),
        posTop: (i - (i % this.fieldSize)) / this.fieldSize,
      });
    }
    this.successCombination.push(0);
  }

  randomizeTiles() {
    const randomValues = [];
    for (let i = 0; i < this.fieldSize * this.fieldSize; i++) {
      randomValues.push(i);
    }
    randomValues.sort(() => Math.random() - 0.5);
    // проверяем решаемость рандомного массива для нечетных досок
    if (this.fieldSize % 2 !== 0) {
      let inversions = 0;
      for (let i = 0; i < randomValues.length; i++) {
        for (let j = i; j < randomValues.length; j++) {
          if (randomValues[i] > randomValues[j] && randomValues[i] !== 0 && randomValues[j] !== 0) {
            inversions++;
          }
        }
      }
      if (inversions % 2 === 0) {
        for (let i = 0; i < this.tiles.length; i++) {
          this.tiles[i].value = randomValues[i];
        }
      } else {
        return this.randomizeTiles();
      }
    }
    // проверяем решаемость рандомного массива для четных досок
    if (this.fieldSize % 2 === 0) {
      let inversions = 0;
      for (let i = 0; i < randomValues.length; i++) {
        for (let j = i; j < randomValues.length; j++) {
          if (randomValues[i] > randomValues[j] && randomValues[i] !== 0 && randomValues[j] !== 0) {
            inversions++;
          }
        }
      }
      const rowNumber = Math.floor(randomValues.indexOf(0) / this.fieldSize);
      inversions += rowNumber;
      if (inversions % 2 !== 0) {
        for (let i = 0; i < this.tiles.length; i++) {
          this.tiles[i].value = randomValues[i];
        }
      } else {
        return this.randomizeTiles();
      }
    }
  }

  renderField(fieldContainer) {
    fieldContainer.innerHTML = '';
    const tileSize = Math.ceil(fieldContainer.clientWidth / this.fieldSize);
    this.tiles.forEach((tileItem) => {
      const tile = document.createElement('div');
      if (tileItem.value === 0) {
        tile.className = 'tile empty-tile';
      } else {
        tile.className = 'tile';
        tile.innerHTML = tileItem.value;
      }
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
      tile.style.top = `${tileItem.posTop * tileSize}px`;
      tile.style.left = `${tileItem.posLeft * tileSize}px`;
      fieldContainer.append(tile);
      tile.addEventListener('click', () => { this.moveTiles(tile); });
    });
  }

  moveTiles(tile) {
    function checkIfNeighbors(tile1, tile2) {
      if ((tile1.posTop === tile2.posTop && Math.abs(tile1.posLeft - tile2.posLeft) === 1)
      || (Math.abs(tile1.posTop - tile2.posTop) === 1 && tile1.posLeft === tile2.posLeft)) {
        return true;
      }
    }

    const emptyEl = document.querySelector('.empty-tile');
    const clickedEl = tile;
    const clickedTile = this.tiles.find((el) => el.value === Number(clickedEl.innerHTML));
    const emptyTile = this.tiles.find((el) => el.value === 0);

    if (checkIfNeighbors(clickedTile, emptyTile)) {
      const emptyPosTop = emptyEl.style.top;
      const emptyPosLeft = emptyEl.style.left;
      emptyTile.value = clickedTile.value;
      clickedTile.value = 0;

      emptyEl.style.top = clickedEl.style.top;
      emptyEl.style.left = clickedEl.style.left;
      clickedEl.style.top = emptyPosTop;
      clickedEl.style.left = emptyPosLeft;
      this.countMoves();
      playAudio();
    }
  }

  isSolved() {
    let rightTiles = 0;
    this.tiles.forEach((tile, index) => {
      if (tile.value === this.successCombination[index]) {
        rightTiles++;
      }
    });
    if (this.tiles.length === rightTiles) {
      return true;
    } return false;
  }
}
