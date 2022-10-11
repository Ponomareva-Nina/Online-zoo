const FeedbackContainer = document.querySelector('.feedback-carousel__track');
const Slider = document.querySelector('.scrollbar__slider');

let TranslateValue = FeedbackContainer.querySelector('.feedback-card').offsetWidth + 30;

let currentTranslate = `translateX(-${Slider.value * TranslateValue}px)`;
let newTranslate = '';

function slideComments() {
  const previousValue = currentTranslate;
  newTranslate = `translateX(-${Slider.value * TranslateValue}px)`;

  const sliderAnimation = [
    { transform: previousValue },
    { transform: newTranslate },
  ];

  FeedbackContainer.animate(sliderAnimation, 500);
  currentTranslate = newTranslate;
  FeedbackContainer.style.transform = currentTranslate;
}

Slider.addEventListener('input', slideComments);

window.addEventListener('resize', () => {
  TranslateValue = FeedbackContainer.querySelector('.feedback-card').offsetWidth + 30;
  FeedbackContainer.style.transform = 'translateX(0px)';
  if (window.matchMedia('(max-width: 979px)')) { FeedbackContainer.style.transform = 'none'; }
});
