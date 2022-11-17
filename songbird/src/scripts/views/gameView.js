import createElem from '../utils/create-element';
import GameController from '../controllers/gameController';

export default class GameView {
  constructor() {
    this.controller = new GameController();
    this.AudioPlayerView;
    this.scoreContainer = createElem('div', 'score');
    this.nextBtn = createElem('button', 'btn btn-next btn_disabled', 'Далее');
    this.birdName = '******';
    this.birdImg = './assets/images/question-bird.png';
    this.answers = [];
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

  createPlayer() {
    const playerContainer = createElem('div', 'question__player');
    return playerContainer;
  }

  createQuestionContainer() {
    const questionContainer = createElem('div', 'question');
    const birdImgContainer = createElem('div', 'question__bird-img');
    const birdImg = createElem('img');
    birdImg.setAttribute('alt', '');
    birdImg.setAttribute('src', this.birdImg);
    birdImgContainer.append(birdImg);
    const birdName = createElem('div', 'question__bird-name', this.birdName);

    const player = this.createPlayer();
    questionContainer.append(birdImgContainer, birdName, player);
    return questionContainer;
  }

  updateAnswers() {
    const currentAnswers = this.controller.getAnswers();
    currentAnswers.forEach((answer) => {
      const li = createElem('li', 'answer', answer);
      const circle = createElem('span', 'circle');
      li.prepend(circle);
      this.answers.push(li);
    });
  }

  createGamePage() {
    const gameContainer = createElem('section', 'game wrapper');
    const categories = this.createCategories();
    const question = this.createQuestionContainer();
    const answersSection = createElem('div', 'answers');
    const variants = createElem('ul', 'answers__list');
    this.updateAnswers();
    this.answers.forEach((answer) => {
      variants.append(answer);
    });

    const birdCardContainer = createElem('div', 'answers__bird-info');
    answersSection.append(variants, birdCardContainer);
    gameContainer.append(this.scoreContainer, categories, question, answersSection, this.nextBtn);

    return gameContainer;
  }
}
