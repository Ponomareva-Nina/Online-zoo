function createBtn(value) {
  const btn = document.createElement('button');
  btn.innerHTML = value;
  return btn;
}

export default function createControls() {
  const Container = document.createElement('div');
  Container.className = 'controls-container';
  const StatusPanel = document.createElement('div');
  StatusPanel.className = 'status-panel';
  const Controls = document.createElement('div');
  Controls.className = 'controls';

  const StartBtn = createBtn('new game');
  StartBtn.className = 'btn start-btn';
  const SaveBtn = createBtn('save');
  SaveBtn.className = 'btn save-btn';
  const ResultsBtn = createBtn('best results');
  ResultsBtn.className = 'btn results-btn';

  Controls.append(StartBtn);
  Controls.append(SaveBtn);
  Controls.append(ResultsBtn);

  Container.append(Controls);
  Container.append(StatusPanel);

  return Container;
}
