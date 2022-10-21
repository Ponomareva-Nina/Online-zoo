export default class GameField {
  constructor(size) {
    this.size = size;
    this.tiles = [];
    this.movesCounter = 0;
    this.tileSize = 100;
  }

  getMoves () {
    return this.movesCounter;
  }
  countMoves() {
    this.movesCounter++;
    return this.movesCounter;
  }

  generateTiles() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.tiles.push({
        value: i,
        left: (i % this.size),
        top: (i - (i % this.size)) / this.size,
      })
    }
  }

  randomizeTiles() {
    let randomValues = [];
    for (let i = 0; i < this.size * this.size; i++) {
      randomValues.push(i);
    }
    randomValues.sort(() => Math.random() - 0.5);
    // проверяем решаемость рандомного массива для нечетных досок
    if (this.size % 2 !== 0) {
      let inversions = 0;
      for (let i = 0; i < randomValues.length; i++){
        for (let j = i; j < randomValues.length; j++){
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
    if (this.size % 2 === 0) {
      let inversions = 0;
      for (let i = 0; i < randomValues.length; i++){
        for (let j = i; j < randomValues.length; j++){
          if (randomValues[i] > randomValues[j] && randomValues[i] !== 0 && randomValues[j] !== 0) {
            inversions++;
          }
        }
      }
      let rowNumber = Math.floor(randomValues.indexOf(0) / this.size);
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
    for (let tileItem of this.tiles) {
    const tile = document.createElement('div');
      if (tileItem.value === 0) {
        tile.className = 'tile empty-tile';
      } else {
        tile.className = 'tile';
        tile.innerHTML = tileItem.value;
      }
      tile.style.top = `${tileItem.top * this.tileSize}px`;
      tile.style.left = `${tileItem.left * this.tileSize}px`;
      fieldContainer.append(tile);
    }
  }
}
