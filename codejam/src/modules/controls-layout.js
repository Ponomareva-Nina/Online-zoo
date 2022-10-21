function createBtn(value) {
  const btn = document.createElement('button');
  btn.innerHTML = value;
  return btn;
}

function createSizeOption(value) {
  const option =  document.createElement('button');
  option.innerHTML = value;
  option.className = 'btn size-btn'
  return option;
}

export function createControls() {
  const Container = document.createElement('div');
  Container.className = 'controls';

  const StartBtn = createBtn('new game');
  StartBtn.className = 'btn start-btn';
  const SaveBtn = createBtn('save');
  SaveBtn.className = 'btn save-btn';
  const ContinueBtn = createBtn('continue');
  ContinueBtn.className = 'btn continue-btn';
  const ResultsBtn = createBtn('best results');
  ResultsBtn.className = 'btn results-btn';

  Container.append(StartBtn);
  Container.append(SaveBtn);
  Container.append(ContinueBtn);
  Container.append(ResultsBtn);
  return Container;
}

export function createSizeControls() {
  const SizeControlsContainer = document.createElement('div');
  SizeControlsContainer.className = 'size-controls'
  for (let i = 3; i <= 8; i++) {
    let sizeOption = createSizeOption(`${i}&times;${i}`);
    SizeControlsContainer.append(sizeOption);
    if (i === 4){sizeOption.classList.add('size-btn_checked')}
  }
  return SizeControlsContainer;
}

export function createStatusPanel() {
  const StatusPanel = document.createElement('div');
  StatusPanel.className = 'status-panel';

  const Moves = document.createElement('div');
  Moves.insertAdjacentHTML('afterbegin', '<span>Moves: </span> <span class="moves-counter">0</span>');
  const Timer = document.createElement('div');
  Timer.insertAdjacentHTML('afterbegin', '<span>Time: </span> <span class="min-counter">00</span>:<span class="sec-counter">00</span>');
  StatusPanel.append(Moves);
  StatusPanel.append(Timer);

  return StatusPanel;
}
