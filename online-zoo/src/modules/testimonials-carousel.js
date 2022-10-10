const FeedbackContainer = document.querySelector('.feedback-carousel__track');
const Slider = document.querySelector('.scrollbar__slider');

const TranslateValue = -23;
let currentTranslate = `translateX(${Slider.value * TranslateValue}%)`;
let newTranslate = '';

function slideComments() {
  const previousValue = currentTranslate;
  newTranslate = `translateX(${Slider.value * TranslateValue}%)`;

  const sliderAnimation = [
    { transform: previousValue },
    { transform: newTranslate },
  ];

  FeedbackContainer.animate(sliderAnimation, 500);
  currentTranslate = newTranslate;
  FeedbackContainer.style.transform = currentTranslate;
}

Slider.addEventListener('input', slideComments);
