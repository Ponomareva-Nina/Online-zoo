export default class GameField {
  constructor(size) {
    this.size = size;
    this.movesCounter = 0;
  }

  getMoves() {
    return this.movesCounter;
  }

  renderField(fieldContainer) {
    const tileSize = 100;

    for (let i = 0; i < this.size * this.size; i++) {
      const tile = document.createElement('div');
      if (i === 0) {
        tile.className = 'tile empty-tile';
      } else {
        tile.className = 'tile';
        tile.innerHTML = i;
      }
      const left = i % this.size;
      const top = (i - left) / this.size;
      tile.style.top = `${top * tileSize}px`;
      tile.style.left = `${left * tileSize}px`;
      fieldContainer.append(tile);
    }
  }
}
