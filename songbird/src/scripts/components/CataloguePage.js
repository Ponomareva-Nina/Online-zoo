import createElem from '../utils/create-element';
import birdsDataRu from '../data/birds-ru';
import BirdCard from './birdCard';

export default class BirdCatalogue {
  constructor() {
    this.birds = birdsDataRu;
    this.catalogueContainer = createElem('section', 'catalogue');
    this.categories = ['', 'Воробьиные', 'Лесные', 'Певчие', 'Хищные', 'Морские'];
  }

  createCataloguePage() {
    this.categories.forEach((category, index) => {
      const group = createElem('article', 'catalogue__category');
      const groupName = createElem('p', 'catalogue__category__name', category);
      group.append(groupName);
      this.birds[index].forEach((bird) => {
        const birdCardObj = new BirdCard(bird);
        const card = birdCardObj.createCard();
        group.append(card);
      });
      this.catalogueContainer.append(group);
    });
    return this.catalogueContainer;
  }
}
