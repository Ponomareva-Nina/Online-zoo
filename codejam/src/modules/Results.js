import Result from './Result';
import { createElem } from './service';

export class Results {
  constructor() {
    this.topResults = [];
  }

  addResult(size, moves, time) {
    const NewResult = new Result(size, moves, time);
    if (this.topResults.length < 10) {
      this.topResults.push(NewResult);
      this.sortResults();
    } else {
      let lastResult = this.topResults[this.topResults.length - 1];
      if (NewResult.moves < lastResult.moves) {
        lastResult = NewResult;
      }
    }
    this.saveResultsToLocalStorage();
  }

  sortResults() {
    this.topResults.sort((a, b) => a.moves - b.moves);
  }

  saveResultsToLocalStorage() {
    const results = JSON.stringify(this.topResults);
    localStorage.setItem('topResults', results);
  }

  getResultsFromLocalStorage() {
    if (localStorage.getItem('topResults') !== null) {
      const results = localStorage.getItem('topResults');
      this.topResults = JSON.parse(results);
    }
  }

  renderResults(TBody) {
    this.topResults.forEach((result, index) => {
      const res = createElem('li', 'result');
      const number = document.createElement('div');
      const size = document.createElement('div');
      const moves = document.createElement('div');
      const time = document.createElement('div');
      number.innerHTML = index + 1;
      size.innerHTML = result.size;
      moves.innerHTML = result.moves;
      time.innerHTML = result.time;

      res.append(number, size, moves, time);
      TBody.append(res);
    });
  }
}

export function createResultsTable() {
  const closeBtn = createElem('button', 'close-btn');
  const Table = createElem('div', 'results-table close');
  const Header = createElem('h2', 'table-title', 'Your best results:');
  const THead = createElem('div', 'table-head');
  const Number = createElem('div', '', '#');
  const Size = createElem('div', '', 'Field size');
  const Moves = createElem('div', '', 'Moves');
  const Time = createElem('div', '', 'Time');
  THead.append(Number, Size, Moves, Time);
  const TBody = createElem('ul', 'results-list');
  Table.append(closeBtn, Header, THead, TBody);
  closeBtn.addEventListener('click', () => {
    TBody.innerHTML = '';
    Table.classList.remove('open');
  });
  return [Table, TBody];
}
