import './../styles/pages/gallery.scss';
import { CustomAudioPlayer } from './modules/CustomAudioPLayer';
import {
  birdsData as birdsDataRu,
  birdsTypes as birdsTypesRu,
} from './birds/birds-data-ru';
import {
  birdsData as birdsDataEn,
  birdsTypes as birdsTypesEn,
} from './birds/birds-data-en';

class Gallery {
  constructor(birdsData, birdsTypes) {
    this.birdsData = birdsData;
    this.birdsTypes = birdsTypes;
    this.numberOfCards = this.birdsData.length;
    this.galleryElem = document.querySelector('.gallery');
  }

  init() {
    this.galleryElem.innerHTML = '';

    for (let i = 0; i < this.birdsData.length; i++) {
      for (let j = 0; j < this.birdsData[i].length; j++) {
        let currentBird = this.birdsData[i][j];
        let birdElem = document.createElement('div');
        birdElem.classList.add('gallery__card');
        birdElem.innerHTML = `
        <div class="gallery__card-picture">
          <img src="${currentBird.image}" alt="${currentBird.name}">
        </div> 

        <div class="gallery__card-content">
          <div class="gallery__card-name">${currentBird.name} (${currentBird.species})</div>
          <div class="gallery__card-audio">
          </div>
          <div class="gallery__card-description">
            ${currentBird.description}
          </div>
        </div>
      `;

        const customPlayer = new CustomAudioPlayer(currentBird.audio);
        birdElem
          .querySelector('.gallery__card-audio')
          .append(customPlayer.create());

        this.galleryElem.append(birdElem);
      }
    }
  }
}

let gallery;

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
  document.querySelector('h1').innerText = 'Галерея птиц';

  gallery = new Gallery(birdsDataRu, birdsTypesRu);
  gallery.init();
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

  document.querySelector('h1').innerText = 'Bird gallery';
  gallery = new Gallery(birdsDataEn, birdsTypesEn);
  gallery.init();
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
  document.querySelector('h1').innerText = 'Галерея птиц';

  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Главная';
    document.getElementById('quiz-page').innerText = 'Викторина';
    document.getElementById('gallery-page').innerText = 'Галерея';
  } else {
    document.getElementById('burger-main-page').innerText = 'Главная';
    document.getElementById('burger-quiz-page').innerText = 'Викторина';
    document.getElementById('burger-gallery-page').innerText = 'Галерея';
  }

  gallery = new Gallery(birdsDataRu, birdsTypesRu);
  gallery.init();
});

enLangBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'en');
  document.querySelector('h1').innerText = 'Bird gallery';

  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Main';
    document.getElementById('quiz-page').innerText = 'Quiz';
    document.getElementById('gallery-page').innerText = 'Gallery';
  } else {
    document.getElementById('burger-main-page').innerText = 'Main';
    document.getElementById('burger-quiz-page').innerText = 'Quiz';
    document.getElementById('burger-gallery-page').innerText = 'Gallery';
  }

  gallery = new Gallery(birdsDataEn, birdsTypesEn);
  gallery.init();
});

const burgerIcon = document.querySelector('.header__burger-icon');
const burgerMenu = document.querySelector('.header__burger-menu');
const burgerCloseBtn = document.querySelector('.header__burger-close-btn');

burgerIcon.onclick = () => {
  burgerMenu.classList.toggle('active');
};

burgerCloseBtn.onclick = () => {
  burgerMenu.classList.toggle('active');
};
