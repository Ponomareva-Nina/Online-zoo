import birdsDataRu from './data/birds-ru';

export default class GameModel {
  constructor(controller) {
    this.controller = controller;
    this.score = 0;
    this.attempt = 0;
    this.questions = birdsDataRu;
    this.categories = ['Разминка', 'Воробьиные', 'Лесные', 'Певчие', 'Хищные', 'Морские'];
    this.currentQuestionNum = 0;
    this.currentCategory = 0;
    this.correctAnswer = this.chooseRandomAnswer();
    this.isSolved = false;
  }

  getScore() {
    return this.score;
  }

  chooseRandomAnswer() {
    const randomId = Math.floor(Math.random() * 6) + 1;
    const answer = this.questions[this.currentQuestionNum].find((el) => el.id === randomId);
    return answer;
  }

  getCurrentAnswers() {
    const answers = this.questions[this.currentQuestionNum];
    const names = [];
    answers.forEach((el) => {
      names.push(el.name);
    });
    return names;
  }

  addAttempt() {
    this.attempt += 1;
  }

  solveQuestion() {
    this.isSolved = true;
    this.score += (5 - this.attempt);
    this.attempt = 0;
  }

  toNextQuestion() {
    this.currentQuestionNum += 1;
    this.currentCategory += 1;
    this.correctAnswer = this.chooseRandomAnswer();
    this.isSolved = false;
  }
}
