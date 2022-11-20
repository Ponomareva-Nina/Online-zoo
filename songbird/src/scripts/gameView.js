import createElem from './utils/create-element';
import GameController from './gameController';

export default class GameView {
  constructor() {
    this.controller = new GameController(this);
    this.scoreContainer = createElem('div', 'score', 'Счёт: 0');
    this.categoriesList = createElem('ul', 'categories');
    this.questionSection = createElem('div', 'question');
    this.birdName = createElem('div', 'question__bird-name', '******');
    this.birdImgContainer = createElem('div', 'question__bird-img');
    this.answersSection = createElem('div', 'answers');
    this.answersContainer = createElem('ul', 'answers__list');
    this.birdCardContainer = createElem('div', 'answers__bird-info');
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

  createCategories() {
    const categories = this.controller.getCategories();
    const activeNum = this.controller.getCurrentCategoryNum();
    for (let i = 0; i < categories.length; i++) {
      const li = createElem('li', 'category', categories[i]);
      if (i === activeNum) {
        this.activeCategory = li;
        this.activeCategory.classList.add('category_active');
      }
      this.categoriesList.append(li);
    }
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

  setBirdImg(imgSrc) {
    this.birdImgContainer.innerHTML = '';
    const birdImg = createElem('img');
    birdImg.setAttribute('alt', '');
    birdImg.setAttribute('src', imgSrc);
    this.birdImgContainer.append(birdImg);
  }

  updateInfo() {
    this.categoriesList.innerHTML = '';
    this.createCategories();
    this.answersContainer.innerHTML = '';
    this.createAnswers();
    this.setBirdImg('./assets/images/question-bird.png');
    this.birdName.innerHTML = '******';
    this.birdCardContainer.innerHTML = 'Прослушайте запись и выберите правильный ответ';
  }

  createGamePage() {
    this.updateInfo();
    const player = this.controller.getPlayerView();
    this.questionSection.append(this.birdImgContainer, this.birdName, player);
    this.answersSection.append(this.answersContainer, this.birdCardContainer);

    this.nextBtn.onclick = () => {
      this.controller.toNextQuestion();
      this.disableNextBtn();
      this.updateInfo();
    };

    this.gameContainer.append(this.scoreContainer, this.categoriesList, this.questionSection, this.answersSection, this.nextBtn);
    return this.gameContainer;
  }
}
