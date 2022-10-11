/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
const ANIMALS = [
  {
    name: 'Giant Pandas',
    habitat: 'Native to Southwest China',
    iconURL: '../../assets/images/icons/banana-bamboo-icon.svg',
    imgURL: '../../assets/images/pandas.jpg',
  },
  {
    name: 'Eagles',
    habitat: 'Native to South America',
    iconURL: '../../assets/images/icons/meet-fish-icon.svg',
    imgURL: '../../assets/images/eagles.jpg',
  },
  {
    name: 'Gorillas',
    habitat: 'Native to Congo',
    iconURL: '../../assets/images/icons/banana-bamboo-icon.svg',
    imgURL: '../../assets/images/gorillas.jpg',
  },
  {
    name: 'Two-toed Sloth',
    habitat: 'Mesoamerica, South America',
    iconURL: '../../assets/images/icons/banana-bamboo-icon.svg',
    imgURL: '../../assets/images/sloth.jpg',
  },
  {
    name: 'Cheetahs',
    habitat: 'Native to Africa',
    iconURL: '../../assets/images/icons/meet-fish-icon.svg',
    imgURL: '../../assets/images/cheetahs.jpg',
  },
  {
    name: 'Penguins',
    habitat: 'Native to Antarctica',
    iconURL: '../../assets/images/icons/meet-fish-icon.svg',
    imgURL: '../../assets/images/penguins.jpg',
  },
  {
    name: 'Alligators',
    habitat: 'Native to Southeastern U. S.',
    iconURL: '../../assets/images/icons/meet-fish-icon.svg',
    imgURL: '../../assets/images/alligators.jpg',
  },
  {
    name: 'Gorillas',
    habitat: 'Native to Congo',
    iconURL: '../../assets/images/icons/banana-bamboo-icon.svg',
    imgURL: '../../assets/images/gorillas2.jpg',
  },
];

const CarouselBtnLeft = document.querySelector('#btn-left');
const CarouselBtnRight = document.querySelector('#btn-right');
const CarouselTrack = document.querySelector('.carousel-track');
const LeftItems = document.querySelector('.items-left');
const RightItems = document.querySelector('.items-right');
const ActiveItems = document.querySelector('.items-active');
let cardsQuantity = 6;
const mediaQueryTabletsMax = window.matchMedia('(max-width: 979px)');

mediaQueryTabletsMax.addEventListener('change', () => {
  if (mediaQueryTabletsMax.matches) {
    cardsQuantity = 4;
    LeftItems.innerHTML = '';
    createNewCardsTemplate(LeftItems, cardsQuantity);
    RightItems.innerHTML = '';
    createNewCardsTemplate(RightItems, cardsQuantity);
  } else {
    cardsQuantity = 6;
    ActiveItems.innerHTML = '';
    createNewCardsTemplate(ActiveItems, cardsQuantity);
    LeftItems.innerHTML = '';
    createNewCardsTemplate(LeftItems, cardsQuantity);
    RightItems.innerHTML = '';
    createNewCardsTemplate(RightItems, cardsQuantity);
  }
});

createNewCardsTemplate(LeftItems, cardsQuantity);
createNewCardsTemplate(RightItems, cardsQuantity);
createNewCardsTemplate(ActiveItems, cardsQuantity);

CarouselBtnLeft.addEventListener('click', moveLeft);
CarouselBtnRight.addEventListener('click', moveRight);

CarouselTrack.addEventListener('animationend', (animation) => {
  if (animation.animationName === 'move-left') {
    CarouselTrack.classList.remove('transition-left');
    ActiveItems.innerHTML = LeftItems.innerHTML;
    LeftItems.innerHTML = '';
    createNewCardsTemplate(LeftItems, cardsQuantity);
  } else {
    CarouselTrack.classList.remove('transition-right');
    ActiveItems.innerHTML = RightItems.innerHTML;
    RightItems.innerHTML = '';
    createNewCardsTemplate(RightItems, cardsQuantity);
  }
  CarouselBtnLeft.addEventListener('click', moveLeft);
  CarouselBtnRight.addEventListener('click', moveRight);
});

function moveLeft() {
  CarouselTrack.classList.add('transition-left');
  CarouselBtnLeft.removeEventListener('click', moveLeft);
  CarouselBtnRight.removeEventListener('click', moveRight);
}

function moveRight() {
  CarouselTrack.classList.add('transition-right');
  CarouselBtnLeft.removeEventListener('click', moveLeft);
  CarouselBtnRight.removeEventListener('click', moveRight);
}

function createAnimalCard(i) {
  const card = document.createElement('article');
  card.classList.add('animal-card');
  card.classList.add(`card${i}`);
  card.insertAdjacentHTML('beforeend', `<a class="animal-card__link" href="#">
    <img class="animal-card__image" src="${ANIMALS[i].imgURL}" alt="${ANIMALS[i].name}" width="366" height="366">
    <div class="animal-card__content">
      <div class="animal-card__text">
        <h4 class="animal-card__title">${ANIMALS[i].name}</h4>
        <p>${ANIMALS[i].habitat}</p>
        <button class="animal-card__btn">Watch online</button>
      </div>
      <img class="animal-card__icon" src="${ANIMALS[i].iconURL}" alt="">
    </div>
  </a>`);
  return card;
}

function createNewCardsTemplate(sideItems, quantity) {
  for (let i = 0; ; i++) {
    const index = Math.floor(Math.random() * ANIMALS.length);
    const card = createAnimalCard(index);
    if (!sideItems.querySelector(`.card${index}`)) {
      sideItems.append(card);
    }
    if (sideItems.children.length === quantity) {
      break;
    }
  }
}
