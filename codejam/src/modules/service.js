export function createElem(tag, className = '', text = '') {
  const elem = document.createElement(tag);
  elem.className = className;
  elem.innerHTML = text;
  return elem;
}

export function createBtn(text = '', className = '', value = '') {
  const btn = document.createElement('button');
  btn.className = className;
  btn.innerHTML = text;
  btn.value = value;
  return btn;
}

export function createEndGameMessage(count, time, messageContainer) {
  const message = createElem('div', 'popup', `Hooray! You solved the puzzle in&nbsp;${time} and ${count}&nbsp;moves!`);
  messageContainer.append(message);
}
