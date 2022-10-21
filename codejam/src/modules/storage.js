function createJsonObj(obj){
  const JsonObj = {};
  for (let i = 0; i < obj.length; i++){
    JsonObj[i] = obj[i].outerHTML;
  }
  return JsonObj;
}

export function saveToStorage(obj){
  let currentState = createJsonObj(obj);
  let str = JSON.stringify(currentState);
  localStorage.setItem('currentGame', str);
}

export function renderGameFromStorage(DOMContainer) {
  if (localStorage.getItem('currentGame') == null) {
     return
  } else {
    let str = localStorage.getItem('currentGame');
    let JsonObj = JSON.parse(str);
    let length = Object.keys(JsonObj).length;
    DOMContainer.innerHTML = '';

    for (let i = 0; i < length; i++){
      DOMContainer.insertAdjacentHTML('afterbegin', JsonObj[i]);
    }
  }
}
