export default class GameField {
  constructor(size) {
    this.size = size;
    this.tiles = [];
    this.movesCounter = 0;
    this.tileSize = 100;
  }

  getMoves() {
    return this.movesCounter;
  }

  generateTiles() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.tiles.push({
        disabled: false,
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

    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].value = randomValues[i];
    }
    console.log(this.tiles);
  }

  renderField(fieldContainer) {
    for (let tileItem of this.tiles) {
    const tile = document.createElement('div');
      if (tileItem.value === 0) {
          tileItem.disabled = true,
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
