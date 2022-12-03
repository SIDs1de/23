document.addEventListener('DOMContentLoaded', function () {
  let heads = document.querySelectorAll('.questions__head');
  let bodies = document.querySelectorAll('.questions__body');
  let burger = document.querySelector('.header__burger');
  let menu = document.querySelector('.header__menu');
  let body = document.querySelector('.page');
  let menuLinks = document.querySelectorAll('[data-goto]');
  let popupOpenBtns = document.querySelectorAll('[data-open-pop]');
  let popups = document.querySelectorAll('[data-pop]');
  let headerBg = document.querySelector('.header__bg');
  let popupBgs = document.querySelectorAll('.popup__bg');
  let headerLinks = document.querySelectorAll('.header__link');

  function wow() {
    wow = new WOW({
      live: false, // default
    });
    wow.init();
  }

  function accordion() {
    heads.forEach((e) => {
      e.addEventListener('click', () => {
        bodies.forEach((i) => {
          if (i.style.maxHeight) {
            i.style.maxHeight = null;
            i.style.paddingTop = '0px';
            i.previousElementSibling.classList.remove('active');
          } else if (e.dataset.tab === i.dataset.tab) {
            i.previousElementSibling.classList.add('active');
            i.style.maxHeight = i.scrollHeight + 20 + 'px';
            i.style.paddingTop = '20px';
          }
        });
      });
    });
  }

  function burgerMenu() {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      menu.classList.toggle('active');
      headerBg.classList.toggle('active');
      body.classList.toggle('lock');
    });
    headerBg.addEventListener('click', () => {
      burger.classList.remove('active');
      menu.classList.remove('active');
      headerBg.classList.remove('active');
      body.classList.remove('lock');
    });
    headerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        headerBg.classList.remove('active');
        body.classList.remove('lock');
      });
    });
  }

  function navigation() {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', (e) => {
        let gotoBlock = document.querySelector(menuLink.dataset.goto);
        let gotoBlockValue =
          gotoBlock.getBoundingClientRect().top + pageYOffset;
        window.scrollTo({
          top: gotoBlockValue,
          behavior: 'smooth',
        });
        e.preventDefault();
      });
    });
  }

  function openPopup() {
    popupOpenBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        body.classList.add('lock');
        popups.forEach((popup) => {
          console.log(popup.dataset.pop);
          console.log(e.target.dataset.openPop);
          if (popup.dataset.pop == e.target.dataset.openPop) {
            popup.classList.add('active');
          }
        });
        e.preventDefault();
      });
    });
    popupBgs.forEach((bg) => {
      bg.addEventListener('click', (e) => {
        body.classList.remove('lock');
        let pop = document.querySelector(
          `[data-pop="${e.target.dataset.close}"]`
        );
        pop.classList.remove('active');
      });
    });
    document.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let pop = document.querySelector(
          `[data-pop="${e.target.dataset.close}"]`
        );
        pop.classList.remove('active');
        body.classList.remove('lock');
      });
    });
  }

  wow();
  openPopup();
  navigation();
  burgerMenu();
  accordion();
});
