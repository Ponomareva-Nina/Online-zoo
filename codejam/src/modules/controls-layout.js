function createBtn(value) {
  const btn = document.createElement('button');
  btn.innerHTML = value;
  btn.className = 'btn';
  return btn;
}

export default function createControls() {
  const Container = document.createElement('div');
  Container.className = 'controls-container';
  const StatusPanel = document.createElement('div');
  StatusPanel.className = 'status-panel';
  const Controls = document.createElement('div');
  Controls.className = 'controls';

  const StartBtn = createBtn('shuffle and start');
  const StopBtn = createBtn('stop the game');
  const SaveBtn = createBtn('save');
  const ResultsBtn = createBtn('results');

  Controls.append(StartBtn);
  Controls.append(StopBtn);
  Controls.append(SaveBtn);
  Controls.append(ResultsBtn);

  Container.append(Controls);
  Container.append(StatusPanel);

  return Container;
}
