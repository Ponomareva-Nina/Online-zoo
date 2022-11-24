import createElem from '../utils/create-element';
import birdsDataRu from '../data/birds-ru';
import birdsDataEn from '../data/birds-en';
import BirdCard from './birdCard';
import { getLangContent } from './translation';

export default class BirdCatalogue {
  constructor() {
    this.catalogueContainer = createElem('section', 'catalogue');
    this.lang = getLangContent();
    if (localStorage.getItem('language') === 'en') {
      this.birds = birdsDataEn;
    } else {
      this.birds = birdsDataRu;
    }
    this.categories = this.lang.catalogueCategories;
    this.groupTitles = [];
    this.birdCards = [];
  }

  changeLanguage(lang) {
    this.categories = lang.catalogueCategories;
    if (localStorage.getItem('language') === 'en') {
      this.birds = birdsDataEn;
    } else {
      this.birds = birdsDataRu;
    }
    this.catalogueContainer.innerHTML = '';
    this.createCataloguePage();
  }

  createCataloguePage() {
    this.categories.forEach((category, index) => {
      const group = createElem('article', 'catalogue__category');
      const groupName = createElem('p', 'catalogue__category__name', category);
      group.append(groupName);
      this.groupTitles.push(groupName);
      this.birds[index].forEach((bird) => {
        const birdCardObj = new BirdCard(bird);
        const card = birdCardObj.createCard();
        this.birdCards.push(birdCardObj);
        group.append(card);
      });
      this.catalogueContainer.append(group);
    });
    return this.catalogueContainer;
  }
}
