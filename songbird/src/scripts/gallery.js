import './../styles/pages/gallery.scss';

let chosenLanguage;
if (localStorage.getItem('lang')) {
  chosenLanguage = localStorage.getItem('lang');
} else {
  localStorage.setItem('lang', 'ru');
  chosenLanguage = 'ru';
}

if (chosenLanguage === 'ru') {
  document.getElementById('main-page').innerText = 'Главная';
  document.getElementById('quiz-page').innerText = 'Викторина';
} else {
  document.getElementById('main-page').innerText = 'Main';
  document.getElementById('quiz-page').innerText = 'Quiz';
}

const ruLangBtn = document.querySelector('#lang-ru');
const enLangBtn = document.querySelector('#lang-en');

ruLangBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'ru');
  document.getElementById('main-page').innerText = 'Главная';
  document.getElementById('quiz-page').innerText = 'Викторина';
});

enLangBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'en');
  document.getElementById('main-page').innerText = 'Main';
  document.getElementById('quiz-page').innerText = 'Quiz';
});

const header = document.querySelector('.header');

videoContainer.style.height = `calc(100vh - ${header.clientHeight}px)`;

const burgerIcon = document.querySelector('.header__burger-icon');
const burgerMenu = document.querySelector('.header__burger-menu');
const burgerCloseBtn = document.querySelector('.header__burger-close-btn');

burgerIcon.onclick = () => {
  burgerMenu.classList.toggle('active');
};

burgerCloseBtn.onclick = () => {
  burgerMenu.classList.toggle('active');
};
