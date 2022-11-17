import createElem from '../utils/create-element';

const birds = [
  { src: './assets/images/vulture.png', text: 'hiss-hiss' },
  { src: './assets/images/owl.png', text: 'whoo-whoo' },
  { src: './assets/images/sparrow.png', text: 'tweet' },
  { src: './assets/images/heron.png', text: 'ro-ro-ro' },
];

export default function createStartPage() {
  const container = createElem('div', 'start-page');
  const title = createElem('h2', 'intro-title', 'Songbird - музыкально-дидактическая викторина для распознавания птиц по их голосам.');
  const btn = createElem('button', 'btn start-game-btn', 'Играть');
  const birdsList = createElem('ul', 'birds-intro');

  for (let i = 0; i < birds.length; i++) {
    const bird = createElem('li', 'birds-intro__bird');
    const img = createElem('img');
    img.setAttribute('src', birds[i].src);
    img.setAttribute('alt', '');
    const text = createElem('p', '', birds[i].text);
    bird.append(img, text);
    birdsList.append(bird);
  }

  container.append(title, btn, birdsList);
  return [btn, container];
}
