function checkIfNeighbors(tile1, tile2) {
  let TileSize =  Number(tile1.style.width.slice(0, -2));
  let Tile1Top = Number(tile1.style.top.slice(0, -2));
  let Tile1Left = Number(tile1.style.left.slice(0, -2));
  let Tile2Top = Number(tile2.style.top.slice(0, -2));
  let Tile2Left = Number(tile2.style.left.slice(0, -2));

  if (Math.abs(Tile1Top - Tile2Top) === 0 && Math.abs(Tile1Left - Tile2Left) === TileSize
    || Math.abs(Tile1Top - Tile2Top) === TileSize && Math.abs(Tile1Left - Tile2Left) === 0) {
    return true;
  } else {
    return false;
  }
}

export function moveTile(event) {
  const emptyTile = document.querySelector('.empty-tile');
  const clickedTile =  event.target;

  if (!checkIfNeighbors(emptyTile, clickedTile)) {
    return;
  } else {
    let emptyPosTop = emptyTile.style.top;
    let emptyPosLeft = emptyTile.style.left;

    emptyTile.style.top = clickedTile.style.top;
    emptyTile.style.left = clickedTile.style.left;
    clickedTile.style.top = emptyPosTop;
    clickedTile.style.left = emptyPosLeft;
  }
}

export function countMoves(event, obj, input) {
  const clickedTile = event.target;
  const emptyTile = document.querySelector('.empty-tile');

  if (clickedTile.innerHTML !== "" && checkIfNeighbors(emptyTile, clickedTile)) {
    let counter = obj.countMoves();
    input.innerHTML = counter;
  }
}
