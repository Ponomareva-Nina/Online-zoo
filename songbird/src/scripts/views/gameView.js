import createElem from '../utils/create-element';
import GameController from '../controllers/gameController';

export default class GameView {
  constructor() {
    this.controller = new GameController();
    this.AudioPlayerView;
    this.scoreContainer = createElem('div', 'score');
    this.nextBtn = createElem('button', 'btn btn-next');
    this.birdName = '******';
    this.birdImg = './assets/images/question-bird.png';
  }

  updateScore() {
    this.scoreContainer.innerHTML = `Cчет: ${this.controller.getScore()}`;
  }

  createCategories() {
    const categoriesList = createElem('ul', 'categories');
    const categories = this.controller.getCategories();
    categories.forEach((category) => {
      const li = createElem('li', 'category', category);
      categoriesList.append(li);
    });
    return categoriesList;
  }

  disableNextBtn() {
    this.nextBtn.classListAdd('btn_disabled');
  }

  enableNextBtn() {
    this.nextBtn.classListRemove('btn_disabled');
  }

  createGamePage() {
    const gameContainer = createElem('section', 'game wrapper');
    const categories = this.createCategories();
    const questionContainer = createElem('div', 'question');
    const birdImgContainer = createElem('div', 'question__bird-img');
    const birdImg = createElem('img');
    birdImg.setAttribute('alt', '');
    birdImg.setAttribute('src', this.birdImg);
    birdImgContainer.append(birdImg);
    const birdName = createElem('div', 'question__bird-name', this.birdName);
    const playerContainer = createElem('div', 'question__player');
    questionContainer.append(birdImgContainer, birdName, playerContainer);

    gameContainer.append(this.scoreContainer, categories, questionContainer);
    return gameContainer;
  }
}
