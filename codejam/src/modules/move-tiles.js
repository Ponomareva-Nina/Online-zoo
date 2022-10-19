export default function moveTile(event) {
  const emptyTile = document.querySelector('.empty-tile');
  const clickedTile =  event.target;

  let emptyPosTop = emptyTile.style.top;
  let emptyPosLeft = emptyTile.style.left;
  let positionEmptyTop = Number(emptyPosTop.charAt(0));
  let positionEmptyLeft = Number(emptyPosLeft.charAt(0));
  let positionClickedTop = Number(clickedTile.style.top.charAt(0));
  let positionClickedLeft = Number(clickedTile.style.left.charAt(0));

  if (Math.abs(positionEmptyTop - positionClickedTop) === 0 && Math.abs(positionEmptyLeft - positionClickedLeft) === 1
    || Math.abs(positionEmptyTop - positionClickedTop) === 1 && Math.abs(positionEmptyLeft - positionClickedLeft) === 0) {
    emptyTile.style.top = clickedTile.style.top;
    emptyTile.style.left = clickedTile.style.left;
    clickedTile.style.top = emptyPosTop;
    clickedTile.style.left = emptyPosLeft;
  }
}