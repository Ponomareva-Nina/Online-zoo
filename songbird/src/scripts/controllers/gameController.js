import GameModel from '../models/gameModel';

export default class GameController {
  constructor(view) {
    this.view = view;
    this.model = new GameModel(this);
  }

  getCategories() {
    return this.model.categories;
  }

  getAnswers() {
    return this.model.getCurrentAnswers();
  }

  checkAnswer(answer) {
    if (answer.innerText === this.model.correctAnswer) {
      if (!this.model.isSolved) {
        this.model.solveQuestion();
        this.view.checkSuccess(answer);
        this.view.updateScore(this.model.getScore());
      }
    } else {
      if (!this.model.isSolved) {
        this.model.addAttempt();
        this.view.checkError(answer);
      }
    }
  }
}
