export default function toggleMenu(burgerBtn, menu) {
  burgerBtn.classList.toggle('burger-menu_active');
  menu.classList.toggle('main-nav_active');
  document.body.classList.toggle('no-scroll');

  window.addEventListener('click', (elem) => {
    if (menu.classList.contains('main-nav_active')) {
      const { target } = elem;

      if ((!target.closest('.main-nav') && !target.closest('.burger-menu')) || (target.closest('.nav-link'))) {
        burgerBtn.classList.remove('burger-menu_active');
        menu.classList.remove('main-nav_active');
        document.body.classList.remove('no-scroll');
      }
    }
  });
}
