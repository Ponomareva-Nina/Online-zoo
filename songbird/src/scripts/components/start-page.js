import createElem from '../utils/create-element';
import { getLangContent } from './translation';

const birds = [
  { src: './assets/images/vulture.png', text: 'hiss-hiss' },
  { src: './assets/images/owl.png', text: 'whoo-whoo' },
  { src: './assets/images/sparrow.png', text: 'tweet' },
  { src: './assets/images/heron.png', text: 'ro-ro-ro' },
];

export default class StartPage {
  constructor() {
    this.title = createElem('h2', 'intro-title');
    this.btn = createElem('button', 'btn start-game-btn');
    this.lang = getLangContent();
  }

  changeLanguage(lang) {
    this.title.textContent = lang.mainTitle;
    this.btn.textContent = lang.mainPlayBtn;
  }

  createStartPage() {
    const container = createElem('div', 'start-page');
    const birdsList = createElem('ul', 'birds-intro');
    this.title.textContent = this.lang.mainTitle;
    this.btn.textContent = this.lang.mainPlayBtn;

    for (let i = 0; i < birds.length; i++) {
      const bird = createElem('li', 'birds-intro__bird');
      const img = createElem('img');
      img.setAttribute('src', birds[i].src);
      img.setAttribute('alt', '');
      const text = createElem('p', '', birds[i].text);
      bird.append(img, text);
      birdsList.append(bird);
    }

    container.append(this.title, this.btn, birdsList);
    return [this.btn, container];
  }
}
