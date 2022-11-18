import createElem from '../utils/create-element';
import GameController from '../controllers/gameController';

export default class GameView {
  constructor() {
    this.controller = new GameController(this);
    this.scoreContainer = createElem('div', 'score', 'Счёт: 0');
    this.nextBtn = createElem('button', 'btn btn-next btn_disabled', 'Далее');
    this.birdName = '******';
    this.birdImg = './assets/images/question-bird.png';
    this.currentBirdCard;
    this.currentCategory;
  }

  updateScore(number) {
    this.scoreContainer.innerHTML = `Cчет: ${number}`;
  }

  disableNextBtn() {
    this.nextBtn.classListAdd('btn_disabled');
  }

  enableNextBtn() {
    this.nextBtn.classListRemove('btn_disabled');
  }



  // Это точно относится к вью:

  createPlayer() {
    const playerContainer = createElem('div', 'question__player');
    return playerContainer;
  }

  checkSuccess(answer) {
    answer.classList.add('answer_correct');
  }

  checkError(answer) {
    answer.classList.add('answer_wrong');
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

  createGamePage() {
    const gameContainer = createElem('section', 'game wrapper');
    const categories = this.createCategories();
    const question = this.createQuestionContainer();
    const answersSection = createElem('div', 'answers');
    const variants = createElem('ul', 'answers__list');
    const answersArr = this.controller.getAnswers();
    answersArr.forEach((el) => {
      const answer = createElem('li', 'answer', el);
      const circle = createElem('span', 'circle');
      answer.prepend(circle);
      variants.append(answer);
      answer.onclick = () => {
        this.controller.checkAnswer(answer);
      };
    });

    const birdCardContainer = createElem('div', 'answers__bird-info');
    answersSection.append(variants, birdCardContainer);
    gameContainer.append(this.scoreContainer, categories, question, answersSection, this.nextBtn);

    return gameContainer;
  }
}