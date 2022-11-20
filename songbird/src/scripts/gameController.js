import GameModel from './gameModel';

export default class GameController {
  constructor(view) {
    this.view = view;
    this.model = new GameModel(this);
  }

  getCategories() {
    return this.model.categories;
  }

  getCurrentCategoryNum() {
    return this.model.currentCategory;
  }

  getAnswers() {
    return this.model.getCurrentAnswers();
  }

  getCorrectAnswer() {
    return this.model.correctAnswer;
  }

  checkAnswer(answer) {
    if (answer.innerText === this.model.correctAnswer.name) {
      if (!this.model.isSolved) {
        answer.classList.add('answer_correct');
        this.model.solveQuestion();
        this.view.updateScore(this.model.getScore());
        this.view.enableNextBtn();
        this.view.birdName.innerText = this.model.correctAnswer.name;
        this.view.setBirdImg(this.model.correctAnswer.image);
      }
    } else if (!this.model.isSolved) {
      answer.classList.add('answer_wrong');
      this.model.addAttempt();
    }
  }

  toNextQuestion() {
    this.model.toNextQuestion();
  }
}
