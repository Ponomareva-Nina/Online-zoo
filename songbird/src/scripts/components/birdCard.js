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
    const topSection = createElem('div', 'bird-card__top-section');
    const playerSection = createElem('div', 'bird-card__player-section');
    const birdName = createElem('div', 'bird-card__name', this.birdName);
    const birdImgContainer = createElem('div', 'bird-img bird-card__img');
    const birdImg = createElem('img');
    birdImgContainer.append(birdImg);
    birdImg.setAttribute('alt', '');
    birdImg.setAttribute('src', this.image);
    const description = createElem('div', 'bird-card__description', this.description);
    const species = createElem('div', 'bird-card__species', this.species);
    const player = this.audio.createPlayer();
    playerSection.append(birdName, species, player);
    topSection.append(birdImgContainer, playerSection);
    cardContainer.append(topSection, description);
    return cardContainer;
  }
}
