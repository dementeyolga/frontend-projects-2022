import './../styles/pages/main.scss';
import bgVideo from './../assets/video/main-video.mp4';
import bgVideoPoster from './../assets/images/main-video-poster.png';

let chosenLanguage;
if (localStorage.getItem('lang')) {
  chosenLanguage = localStorage.getItem('lang');
} else {
  localStorage.setItem('lang', 'ru');
  chosenLanguage = 'ru';
}

if (chosenLanguage === 'ru') {
  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Главная';
    document.getElementById('quiz-page').innerText = 'Викторина';
    document.getElementById('gallery-page').innerText = 'Галерея';
  } else {
    document.getElementById('burger-main-page').innerText = 'Главная';
    document.getElementById('burger-quiz-page').innerText = 'Викторина';
    document.getElementById('burger-gallery-page').innerText = 'Галерея';
  }
  document.querySelector('.button--play').innerText = 'Начать игру';
} else {
  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Main';
    document.getElementById('quiz-page').innerText = 'Quiz';
    document.getElementById('gallery-page').innerText = 'Gallery';
  } else {
    document.getElementById('burger-main-page').innerText = 'Main';
    document.getElementById('burger-quiz-page').innerText = 'Quiz';
    document.getElementById('burger-gallery-page').innerText = 'Gallery';
  }

  document.querySelector('.button--play').innerText = 'New game';
}

let ruLangBtn;
let enLangBtn;

if (document.body.clientWidth > 576) {
  ruLangBtn = document.querySelector('#lang-ru');
  enLangBtn = document.querySelector('#lang-en');
} else {
  ruLangBtn = document.querySelector('#burger-lang-ru');
  enLangBtn = document.querySelector('#burger-lang-en');
}

ruLangBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'ru');
  document.querySelector('.button--play').innerText = 'Начать игру';

  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Главная';
    document.getElementById('quiz-page').innerText = 'Викторина';
    document.getElementById('gallery-page').innerText = 'Галерея';
  } else {
    document.getElementById('burger-main-page').innerText = 'Главная';
    document.getElementById('burger-quiz-page').innerText = 'Викторина';
    document.getElementById('burger-gallery-page').innerText = 'Галерея';
  }
});

enLangBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'en');
  document.querySelector('.button--play').innerText = 'New game';

  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Main';
    document.getElementById('quiz-page').innerText = 'Quiz';
    document.getElementById('gallery-page').innerText = 'Gallery';
  } else {
    document.getElementById('burger-main-page').innerText = 'Main';
    document.getElementById('burger-quiz-page').innerText = 'Quiz';
    document.getElementById('burger-gallery-page').innerText = 'Gallery';
  }
});

const video = document.createElement('video');

video.src = bgVideo;
video.poster = bgVideoPoster;
video.autoplay = true;
video.controls = false;
video.muted = true;
video.loop = true;

const videoContainer = document.querySelector('.video__container');

videoContainer.appendChild(video);

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
