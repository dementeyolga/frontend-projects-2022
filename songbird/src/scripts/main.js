import './../styles/pages/main.scss';

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
