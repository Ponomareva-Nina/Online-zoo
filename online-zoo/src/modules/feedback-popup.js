export default function togglePopup(popup) {
  popup.classList.add('feedback-card__popup');
  document.body.classList.add('popup-outer');

  window.addEventListener('click', (elem) => {
    if (popup.classList.contains('feedback-card__popup')) {
      const { target } = elem;
      if (target.classList.contains('popup-outer') || target.classList.contains('popup-close-btn')) {
        popup.classList.remove('feedback-card__popup');
        document.body.classList.remove('popup-outer');
      }
    }
  });
}
