import createElem from '../utils/create-element';
import GameController from '../controllers/gameController';

export default class GameView {
  constructor() {
    this.controller = new GameController(this);
    this.scoreContainer = createElem('div', 'score', 'Счёт: 0');
    this.birdName = createElem('div', 'question__bird-name', '******');
    this.birdImgContainer = createElem('div', 'question__bird-img');
    this.answersContainer = createElem('ul', 'answers__list');
    this.nextBtn = createElem('button', 'btn btn-next btn_disabled', 'Далее');
    this.gameContainer = createElem('section', 'game wrapper');
  }

  updateScore(number) {
    this.scoreContainer.innerHTML = `Cчет: ${number}`;
  }

  disableNextBtn() {
    this.nextBtn.classList.add('btn_disabled');
  }

  enableNextBtn() {
    this.nextBtn.classList.remove('btn_disabled');
  }

  createPlayer() {
    const playerContainer = createElem('div', 'question__player');
    return playerContainer;
  }

  createCategories() {
    const categoriesList = createElem('ul', 'categories');
    const categories = this.controller.getCategories();
    const activeNum = this.controller.getCurrentCategoryNum();
    for (let i = 0; i < categories.length; i++) {
      const li = createElem('li', 'category', categories[i]);
      if (i === activeNum) {
        li.classList.add('category_active');
      }
      categoriesList.append(li);
    }
    return categoriesList;
  }

  createAnswers() {
    const answersArr = this.controller.getAnswers();
    answersArr.forEach((el) => {
      const answer = createElem('li', 'answer', el);
      const circle = createElem('span', 'circle');
      answer.prepend(circle);
      this.answersContainer.append(answer);
      answer.onclick = () => {
        this.controller.checkAnswer(answer);
      };
    });
  }

  updateInfo() {
    this.gameContainer.innerHTML = '';
    this.answersContainer.innerHTML = '';
    this.birdImgContainer.innerHTML = '';
    this.birdName.innerHTML = '******';
    const categories = this.createCategories();
    const topSection = createElem('div', 'question');
    const birdImg = createElem('img');
    birdImg.setAttribute('alt', '');
    birdImg.setAttribute('src', './assets/images/question-bird.png');
    this.birdImgContainer.append(birdImg);

    const player = this.createPlayer();

    topSection.append(this.birdImgContainer, this.birdName, player);

    const answersSection = createElem('div', 'answers');
    this.createAnswers();
    const birdCardContainer = createElem('div', 'answers__bird-info');
    answersSection.append(this.answersContainer, birdCardContainer);

    this.nextBtn.onclick = () => {
      this.controller.toNextQuestion();
      this.disableNextBtn();
      this.updateInfo();
    };

    this.gameContainer.append(this.scoreContainer, categories, topSection, answersSection, this.nextBtn);
  }

  createGamePage() {
    this.updateInfo();
    return this.gameContainer;
  }
}
