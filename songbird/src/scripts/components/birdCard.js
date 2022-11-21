import createElem from '../utils/create-element';

export default class BirdCard {
  constructor(root, card) {
    this.root = root;
    this.birdName = card.name;
    this.species = card.species;
    this.audio = new Audio(card.audio);
    this.image = card.image;
    this.description = card.description;
  }

  renderCard() {
    this.root.append();
  }
}
