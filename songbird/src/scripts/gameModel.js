import AudioPlayer from './components/AudioPlayer';
import { getLangContent } from './components/translation';
import birdsDataRu from './data/birds-ru';
import birdsDataEn from './data/birds-en';

export default class GameModel {
  constructor(controller) {
    this.StorageLanguage = localStorage.getItem('language');
    this.langContent = getLangContent();
    this.controller = controller;
    this.score = 0;
    this.attempt = 0;
    if (this.StorageLanguage === 'en') {
      this.questions = birdsDataEn;
    } else {
      this.questions = birdsDataRu;
    }
    this.categories = this.langContent.gameCategories;
    this.currentQuestionNum = 0;
    this.currentCategory = 0;
    this.correctAnswer = this.chooseRandomAnswer();
    this.isSolved = false;
    this.audioPlayer = new AudioPlayer(this.correctAnswer.audio);
  }

  getScore() {
    return this.score;
  }

  updateLanguage() {
    this.StorageLanguage = localStorage.getItem('language');
    this.langContent = getLangContent();
    if (this.StorageLanguage === 'en') {
      this.questions = birdsDataEn;
    } else {
      this.questions = birdsDataRu;
    }
    this.correctAnswer = this.chooseRandomAnswer();
    this.categories = this.langContent.gameCategories;
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
