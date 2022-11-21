import AudioPlayer from './components/AudioPlayer';
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
    this.audioPlayer = new AudioPlayer(this.correctAnswer.audio);
  }

  getScore() {
    return this.score;
  }

  chooseRandomAnswer() {
    const randomId = Math.floor(Math.random() * this.questions.length) + 1;
    const answer = this.questions[this.currentQuestionNum].find((el) => el.id === randomId);
    return answer;
  }

  getCurrentAnswers() {
    return this.questions[this.currentQuestionNum];
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
    this.audioPlayer.setSong(this.correctAnswer.audio);
    this.isSolved = false;
  }

  endGame() {
    this.score = 0;
    this.attempt = 0;
    this.currentQuestionNum = 0;
    this.currentCategory = 0;
    this.correctAnswer = this.chooseRandomAnswer();
    this.isSolved = false;
    this.audioPlayer = new AudioPlayer(this.correctAnswer.audio);
  }
}
