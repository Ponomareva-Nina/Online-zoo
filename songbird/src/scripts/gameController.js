import GameModel from './gameModel';
import wrong from '../assets/sounds/wrong.mp3';
import correct from '../assets/sounds/correct.mp3';

export default class GameController {
  constructor(view) {
    this.view = view;
    this.model = new GameModel(this);
    this.rightSound = new Audio(correct);
    this.wrongSound = new Audio(wrong);
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

  getPlayerView() {
    return this.model.audioPlayer.createPlayer();
  }

  checkAnswer(answer) {
    if (answer.innerText === this.model.correctAnswer.name) {
      if (!this.model.isSolved) {
        this.rightSound.play();
        this.model.audioPlayer.pause();
        answer.classList.add('answer_correct');
        this.model.solveQuestion();
        this.view.updateScore(this.model.getScore());
        this.view.enableNextBtn();
        this.view.birdName.innerText = this.model.correctAnswer.name;
        this.view.setBirdImg(this.model.correctAnswer.image);
      }
    } else if (!this.model.isSolved) {
      this.wrongSound.play();
      answer.classList.add('answer_wrong');
      this.model.addAttempt();
      this.wrongSound.currentTime = 0;
    }
  }

  toNextQuestion() {
    this.model.audioPlayer.stop();
    this.model.toNextQuestion();
  }
}
