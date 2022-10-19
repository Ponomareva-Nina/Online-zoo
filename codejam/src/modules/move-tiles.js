export default function moveTile(event) {
  const emptyTile = document.querySelector('.empty-tile');
  const clickedTile =  event.target;

  let emptyPosTop = emptyTile.style.top;
  let emptyPosLeft = emptyTile.style.left;

  emptyTile.style.top = clickedTile.style.top;
  emptyTile.style.left = clickedTile.style.left;
  clickedTile.style.top = emptyPosTop;
  clickedTile.style.left = emptyPosLeft;
}