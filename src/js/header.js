const homeBtn = document.getElementById('bestsellers');
const shopPage = document.getElementById('shop-page');
const homeDesktopLink = document.querySelector('#link-home');
const homeShoppingLink = document.querySelector('#link-shopping');

const currentPageName = window.location.pathname.split('/').pop();

if (currentPageName == 'shopping.html') {
  homeBtn.classList.remove('active');
  shopPage.classList.add('active');
  homeDesktopLink.classList.remove('active');
  homeShoppingLink.classList.add('active');
} else {
  homeBtn.classList.add('active');
  shopPage.classList.remove('active');
  homeDesktopLink.classList.add('active');
  homeShoppingLink.classList.remove('active');
}

const refs = {
  bookList: document.querySelector('.book-list'),
  home: document.getElementById('bestsellers'),
  body: document.querySelector('body'),
};

//burger-js
const ToggleEl = document.querySelector('.box-toggle');
const mobMenuEl = document.querySelector('.mob-menu');
const boxMobMenuEl = document.querySelector('.box-mob-menu');

ToggleEl.addEventListener('click', onClickToggle);
function onClickToggle(event) {
  event.currentTarget.classList.toggle('active');
}

mobMenuEl.addEventListener('click', onClickMobMenu);
function onClickMobMenu(event) {
  event.currentTarget.classList.toggle('active');
  boxMobMenuEl.classList.toggle('active');

  const body = document.querySelector('body');
  if (boxMobMenuEl.classList.contains('active')) {
    body.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
  }
}
