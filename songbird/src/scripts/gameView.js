import createElem from './utils/create-element';
import GameController from './gameController';
import BirdCard from './components/birdCard';
import { getLangContent } from './components/translation';

export default class GameView {
  constructor() {
    this.controller = new GameController(this);
    this.langContent = getLangContent();
    this.scoreContainer = createElem('div', 'score', `${this.langContent.score}: 0`);
    this.categoriesList = createElem('ul', 'categories');
    this.questionSection = createElem('div', 'question');
    this.birdName = createElem('div', 'question__bird-name', '******');
    this.birdImgContainer = createElem('div', 'bird-img');
    this.answersSection = createElem('div', 'answers');
    this.answersContainer = createElem('ul', 'answers__list');
    this.birdCardContainer = createElem('div', 'answers__bird-info');
    this.nextBtn = createElem('button', 'btn btn-next btn_disabled', `${this.langContent.nextBtn}`);
    this.gameContainer = createElem('section', 'game wrapper');
    this.endMsgContainer = createElem('div', 'end-game-msg hidden', '');
  }

  changeLanguage(lang) {
    this.controller.changeModelLang();
    this.createGamePage();
    this.langContent = lang;
    this.birdCardContainer.textContent = lang.gamePageListen;
    this.nextBtn.textContent = lang.nextBtn;
  }

  updateScore(number) {
    this.scoreContainer.innerHTML = `${this.langContent.score}: ${number}`;
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
      const answer = createElem('li', 'answer', el.name);
      const circle = createElem('span', 'circle');
      answer.prepend(circle);
      this.answersContainer.append(answer);
      const bird = new BirdCard(el);
      const birdCard = bird.createCard();

      answer.onclick = () => {
        this.controller.checkAnswer(answer);
        this.birdCardContainer.innerHTML = '';
        this.birdCardContainer.append(birdCard);
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

  createEndGameMsg(score) {
    const message = createElem('div', '');
    message.textContent = `${this.langContent.endGameMsgFirstPart} ${score} ${this.langContent.endGameMsgSecondPart}`;
    this.endMsgContainer.innerHTML = '';
    const playAgainBtn = createElem('button', 'btn start-game-btn', `${this.langContent.mainPlayBtn}`);
    playAgainBtn.addEventListener('click', () => {
      this.endMsgContainer.classList.add('hidden');
    });
    this.endMsgContainer.append(message, playAgainBtn);
    this.endMsgContainer.classList.remove('hidden');
  }

  updateInfo() {
    this.categoriesList.innerHTML = '';
    this.createCategories();
    this.answersContainer.innerHTML = '';
    this.createAnswers();
    this.setBirdImg('./assets/images/question-bird.png');
    this.birdName.innerHTML = '******';
    this.birdCardContainer.innerHTML = this.langContent.gamePageListen;
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

    this.gameContainer.append(this.scoreContainer, this.categoriesList, this.questionSection, this.answersSection, this.nextBtn, this.endMsgContainer);
    return this.gameContainer;
  }
}
