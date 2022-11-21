import createElem from '../utils/create-element';
import AudioPlayer from './AudioPlayer';

export default class BirdCard {
  constructor(card) {
    this.birdName = card.name;
    this.species = card.species;
    this.audio = new AudioPlayer(card.audio);
    this.image = card.image;
    this.description = card.description;
  }

  createCard() {
    const cardContainer = createElem('div', 'bird-card');
    const topSection = createElem('div', 'top-section');
    const birdName = createElem('div', 'bird-card__name', this.birdName);
    const birdImg = createElem('img', 'bird-card__image');
    birdImg.setAttribute('alt', '');
    birdImg.setAttribute('src', this.image);
    const description = createElem('div', 'bird-card__description', this.description);
    const species = createElem('div', 'bird-card__species', this.species);
    const player = this.audio.createPlayer();
    topSection.append(birdImg, birdName, species, player);
    cardContainer.append(topSection, description);
    return cardContainer;
  }
}
