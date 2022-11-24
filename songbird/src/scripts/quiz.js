import './../styles/pages/quiz.scss';
import defaultBirdPicture from './../assets/images/default-bird-img.jpg';
import successSound from './../assets/audio/success-sound.mp3';
import failureSound from './../assets/audio/wrong-sound.mp3';

import {
  birdsData as birdsDataRu,
  birdsTypes as birdsTypesRu,
} from './birds/birds-data-ru';
import {
  birdsData as birdsDataEn,
  birdsTypes as birdsTypesEn,
} from './birds/birds-data-en';

class CustomAudioPlayer {
  constructor(src) {
    this.src = src;
  }

  create() {
    let customPlayer = document.createElement('div');
    customPlayer.classList.add('player');
    customPlayer.innerHTML = `
        <button class="player__play-btn" disabled>
           <div class="player__play-icon paused">
           </div>
        </button>
 
        <div class="player__time">
          <div class="player__time-now"></div> / <div class="player__time-duration"></div>
        </div>
 
        <div class="player__search-container">
          <input class="player__search" type="range" min="0" value="0" step="1" disabled/>
        </div>

        <div class="player__volume-icon high"></div>
        
        <div class="player__volume-container">
          <input class="player__volume" type="range" min="0" max="1" value="1" step="0.1" disabled/>
        </div>
      `;

    const audio = new Audio(this.src),
      playBtn = customPlayer.querySelector('.player__play-btn'),
      playIcon = customPlayer.querySelector('.player__play-icon'),
      currentTime = customPlayer.querySelector('.player__time-now'),
      duration = customPlayer.querySelector('.player__time-duration'),
      searchInput = customPlayer.querySelector('.player__search'),
      volumeInput = customPlayer.querySelector('.player__volume'),
      volumeIcon = customPlayer.querySelector('.player__volume-icon');

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.onplay = () => {
      playIcon.classList.add('playing');
      playIcon.classList.remove('paused');
    };
    audio.onpause = () => {
      playIcon.classList.add('paused');
      playIcon.classList.remove('playing');
    };

    const createTimeString = (secs) => {
      let ss = Math.floor(secs),
        hh = Math.floor(ss / 3600),
        mm = Math.floor((ss - hh * 3600) / 60);
      ss = ss - hh * 3600 - mm * 60;

      if (hh > 0) {
        mm = mm < 10 ? '0' + mm : mm;
      }
      ss = ss < 10 ? '0' + ss : ss;
      return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
    };

    audio.addEventListener('loadstart', () => {
      currentTime.innerHTML = 'Loading';
      duration.innerHTML = '';
    });

    audio.addEventListener('loadedmetadata', () => {
      currentTime.innerHTML = createTimeString(0);
      duration.innerHTML = createTimeString(audio.duration);

      searchInput.max = Math.floor(audio.duration);

      let isSearching = false;
      searchInput.addEventListener('input', () => {
        isSearching = true;
      });

      searchInput.addEventListener('change', () => {
        audio.currentTime = searchInput.value;

        if (!audio.paused) audio.play();
        isSearching = false;
      });

      audio.addEventListener('timeupdate', () => {
        if (!isSearching) {
          searchInput.value = Math.floor(audio.currentTime);
        }
      });
    });

    audio.addEventListener('timeupdate', () => {
      currentTime.innerHTML = createTimeString(audio.currentTime);
      console.log(createTimeString(audio.currentTime));
    });

    volumeInput.addEventListener('change', () => {
      audio.volume = volumeInput.value;

      if (volumeInput.value === '0') {
        volumeIcon.classList.add('muted');
        volumeIcon.classList.remove('high');
        volumeIcon.classList.remove('low');
      } else if (volumeInput.value < 0.5) {
        volumeIcon.classList.add('low');
        volumeIcon.classList.remove('high');
        volumeIcon.classList.remove('muted');
      } else {
        volumeIcon.classList.add('high');
        volumeIcon.classList.remove('low');
        volumeIcon.classList.remove('muted');
      }
    });

    volumeIcon.addEventListener('click', () => {
      if (volumeInput.value !== '0') {
        volumeInput.value = '0';
        volumeIcon.classList.add('muted');
        volumeIcon.classList.remove('high');
        volumeIcon.classList.remove('low');
      } else {
        volumeInput.value = '1';
        volumeIcon.classList.add('high');
        volumeIcon.classList.remove('low');
        volumeIcon.classList.remove('muted');
      }
    });

    audio.addEventListener('canplaythrough', () => {
      playBtn.disabled = false;
      volumeInput.disabled = false;
      searchInput.disabled = false;
    });

    audio.addEventListener('waiting', () => {
      playBtn.disabled = true;
      volumeInput.disabled = true;
      searchInput.disabled = true;
    });

    return customPlayer;
  }
}

class Quiz {
  constructor(birdsData, birdsTypes) {
    this.birdsData = birdsData;
    this.birdsTypes = birdsTypes;
    this.step = 0;
    this.score = 0;
    this.attempt = 0;
    this.maxQuestionScore = 5;
    this.numberOfQuestions = this.birdsData.length;
    this.maxScore = this.numberOfQuestions * this.maxQuestionScore;

    this.successSoundFile = successSound;
    this.failureSoundFile = failureSound;

    this.questionBody = document.querySelector('.question__body');
    this.questionList = document.querySelector('.question__list');
    this.questionAnswers = document.querySelector('.question__answers');
    this.questionBirdDescription = document.querySelector(
      '.question__description'
    );
    this.questionScore = document.querySelector('.question__score');
    this.questionBtns = document.querySelector('.question__buttons');
    this.questionNumber = document.querySelector('.question__number');
  }

  init() {
    this.renderQuestion();
    this.updateQuestionNumber();
  }

  chooseRandomIndex(i) {
    return Math.trunc(Math.random() * i);
  }

  renderQuestionList() {
    let questionListHTML = '';

    for (let i = 0; i < this.numberOfQuestions; i++) {
      questionListHTML += `
        <div class="question__list-item">${this.birdsTypes[i]}</div>
      `;
    }

    this.questionList.innerHTML = questionListHTML;

    let questions = document.querySelectorAll('.question__list-item');
    console.log(questions);

    questions[this.step].classList.add('current');
  }

  createAnswers() {
    let arrOfBirdsInfo = this.birdsData[this.step];
    console.log(arrOfBirdsInfo);

    const correctAnswer =
      arrOfBirdsInfo[this.chooseRandomIndex(arrOfBirdsInfo.length)].name;

    const arrOfAnswers = [];
    const birdsNames = arrOfBirdsInfo.map((item) => item.name);

    while (birdsNames.length) {
      let randInd = this.chooseRandomIndex(birdsNames.length);
      let randBird = birdsNames.splice(randInd, 1)[0];
      let answer = {
        name: randBird,
        correct: randBird === correctAnswer,
      };

      arrOfAnswers.push(answer);
    }

    return arrOfAnswers;
  }

  createButtons() {
    if (this.step < this.numberOfQuestions - 1) {
      let restartStr =
        localStorage.getItem('lang') === 'ru' ? 'Начать сначала' : 'Restart';

      let nextQuestionStr =
        localStorage.getItem('lang') === 'ru'
          ? 'Следующий вопрос'
          : 'Next question';

      this.questionBtns.innerHTML = `
        <button class="question__buttons-button button button--restart">${restartStr}</button>
        <button class="question__buttons-button button button--next" disabled>${nextQuestionStr}</button>
      `;

      this.questionBtns
        .querySelector('.button--next')
        .addEventListener('click', () => {
          if (this.step < this.numberOfQuestions - 1) this.step++;
          console.log(this.step);
          this.updateQuestionNumber();
          this.renderQuestion();
        });
    } else {
      let restartStr =
        localStorage.getItem('lang') === 'ru' ? 'Начать сначала' : 'Restart';

      let resultsStr =
        localStorage.getItem('lang') === 'ru' ? 'Результат' : 'Result';

      this.questionBtns.innerHTML = `
        <button class="question__buttons-button button button--restart">${restartStr}</button>
        <button class="question__buttons-button button button--result" disabled>${resultsStr}</button>
      `;

      this.questionBtns
        .querySelector('.button--result')
        .addEventListener('click', () => {
          this.renderResult();
        });
    }

    this.questionBtns
      .querySelector('.button--restart')
      .addEventListener('click', () => {
        this.step = 0;
        this.score = 0;

        let descriptionStr =
          localStorage.getItem('lang') === 'ru'
            ? 'Прослушай запись пения птицы и выбери подходящую птицу'
            : 'Listen to the audio and choose the right bird';
        this.questionBirdDescription.innerHTML = `
        <div class="question__description-text">
          ${descriptionStr}
        </div>
        `;

        this.updateQuestionNumber();
        this.renderQuestion();
      });
  }

  updateScore() {
    let scoreStr =
      localStorage.getItem('lang') === 'ru'
        ? `Счет: ${this.score}`
        : `Score: ${this.score}`;
    this.questionScore.innerHTML = `
        <div class="question__description-text">
          ${scoreStr}
        </div>
        `;
  }

  updateQuestionNumber() {
    this.questionNumber.innerHTML = `${this.step + 1}/${
      this.numberOfQuestions
    }`;
  }

  openCorrectBird(correctBird) {
    let correctBirdInfo = this.birdsData[this.step].find(
      (item) => item.name === correctBird
    );

    this.questionBody.querySelector('.question__body-picture img').src =
      correctBirdInfo.image;
    this.questionBody.querySelector(
      '.question__body-name'
    ).textContent = `${correctBirdInfo.name} (${correctBirdInfo.species})`;
    const customPlayer = new CustomAudioPlayer(correctBirdInfo.audio);
    this.questionBody.querySelector('.question__body-audio').innerHTML = '';
    this.questionBody
      .querySelector('.question__body-audio')
      .append(customPlayer.create());
    console.log(correctBirdInfo);
  }

  renderQuestion() {
    this.attempt = 0;
    this.renderQuestionList();
    this.updateScore();
    this.createButtons();
    let descriptionStr =
      localStorage.getItem('lang') === 'ru'
        ? 'Прослушай запись пения птицы и выбери подходящую птицу'
        : 'Listen to the audio and choose the right bird';
    this.questionBirdDescription.innerHTML = `
        <div class="question__description-text">
          ${descriptionStr}
          </div>
          `;

    let arrOfBirdsInfo = this.birdsData[this.step];
    let arrOfAnswers = this.createAnswers(arrOfBirdsInfo);
    let correctAnswer = arrOfAnswers.find((item) => item.correct).name;
    let correctBirdInfo = arrOfBirdsInfo.find(
      (item) => item.name === correctAnswer
    );

    this.questionBody.innerHTML = `
          <div class="question__body-picture">
            <img src="${defaultBirdPicture}" alt="">
          </div> 
  
          <div class="question__body-content">
            <div class="question__body-name">****</div>
            <div class="question__body-audio">
            </div>
          </div>
    `;

    const customPlayer = new CustomAudioPlayer(correctBirdInfo.audio);
    this.questionBody
      .querySelector('.question__body-audio')
      .append(customPlayer.create());

    let questionAnswersHTML = '';

    for (let i = 0; i < arrOfAnswers.length; i++) {
      console.log(arrOfAnswers[i]);
      questionAnswersHTML += `
      <input class="question__answers-input" type="radio" name="bird-answer" id="bird-answer-${i}"/> 
      <label for="bird-answer-${i}" class="question__answers-label">
        ${arrOfAnswers[i].name}
      </label> 
      `;
    }

    this.questionAnswers.innerHTML = `<div class="question__answers-container"></div>`;
    let answersContainer = this.questionAnswers.querySelector(
      '.question__answers-container'
    );
    answersContainer.innerHTML = questionAnswersHTML;

    let displayDescriptionHandler = (event) => {
      if (event.target.classList.contains('question__answers-label')) {
        let currentBirdInfo = arrOfBirdsInfo.find(
          (bird) => bird.name === event.target.innerText
        );

        this.questionBirdDescription.innerHTML = `
        <div class="question__description-name">${currentBirdInfo.name} (${currentBirdInfo.species})</div>
          <div class="question__description-middle">
            <div class="question__description-picture">
              <img src="${currentBirdInfo.image}" alt="${currentBirdInfo.name}">
            </div>
            <div class="question__description-audio">
             </div>
          </div>
          <div class="question__description-text">${currentBirdInfo.description}</div>
        `;

        const customPlayer = new CustomAudioPlayer(currentBirdInfo.audio);

        this.questionBirdDescription
          .querySelector('.question__description-audio')
          .append(customPlayer.create());
      }
    };

    let savedThis = this;

    let updateScoreHandler = function fn(event) {
      if (event.target.classList.contains('question__answers-label')) {
        let textContent = event.target.textContent.trim();
        if (
          textContent !== correctAnswer &&
          !event.target.classList.contains('wrong')
        ) {
          if (savedThis.attempt < 5) savedThis.attempt++;
          event.target.classList.add('wrong');
          const failureAudio = new Audio(failureSound);
          console.log(failureAudio);
          failureAudio.play();
          console.log(savedThis.attempt);
        } else if (textContent === correctAnswer) {
          savedThis.score += 5 - savedThis.attempt;
          console.log(savedThis.attempt);
          savedThis.updateScore();
          console.log(savedThis.attempt);
          savedThis.attempt = 0;
          event.target.classList.add('success');
          const pauseBtn = document.querySelector(
            '.question__body-audio .playing'
          );
          if (pauseBtn) pauseBtn.click();
          savedThis.openCorrectBird(correctAnswer);
          let successAudio = new Audio(successSound);
          successAudio.play();

          if (document.querySelector('.button--next')) {
            document.querySelector('.button--next').disabled = false;
          }
          if (document.querySelector('.button--result')) {
            document.querySelector('.button--result').disabled = false;
          }
          this.removeEventListener('click', fn);
        }
      }
    };

    answersContainer.addEventListener('click', displayDescriptionHandler);
    answersContainer.addEventListener('click', updateScoreHandler);
  }

  renderResult() {
    let resultInfo;

    if (this.score < this.maxScore) {
      resultInfo =
        localStorage.getItem('lang') === 'ru'
          ? `Вы набрали ${this.score}/${this.maxScore} баллов. Играть снова?`
          : `You finished the quiz with ${this.score}/${this.maxScore} points. Want to try again?`;
    } else {
      resultInfo =
        localStorage.getItem('lang') === 'ru'
          ? `Вы набрали максимум баллов (${this.score}/${this.maxScore}). Поздравляю!`
          : `You finished the quiz with ${this.score}/${this.maxScore} points. Congratulations!`;
    }

    let restartStr =
      localStorage.getItem('lang') === 'ru' ? `Играть снова` : `Play again`;

    this.questionBody.innerHTML = '';
    this.questionBtns.innerHTML = '';

    document.querySelector('.question__bottom').innerHTML = `
        <div class="result">
          <p class="result__info">${resultInfo}</p>
          <button class="question__buttons-button button button--restart">${restartStr}</button>
        </div>
      `;

    this.questionBtns
      .querySelector('.button--restart')
      .addEventListener('click', () => {
        this.step = 0;
        this.score = 0;

        let descriptionStr =
          localStorage.getItem('lang') === 'ru'
            ? 'Прослушай запись пения птицы и выбери подходящую птицу'
            : 'Listen to the audio and choose the right bird';
        this.questionBirdDescription.innerHTML = `
        <div class="question__description-text">
          ${descriptionStr}
        </div>
      `;

        this.updateQuestionNumber();
        this.renderQuestion();
      });
  }
}

let chosenLanguage;
if (localStorage.getItem('lang')) {
  chosenLanguage = localStorage.getItem('lang');
} else {
  localStorage.setItem('lang', 'ru');
  chosenLanguage = 'ru';
}

let quiz;

if (chosenLanguage === 'ru') {
  if (document.body.clientWidth > 576) {
    document.getElementById('main-page').innerText = 'Главная';
    document.getElementById('quiz-page').innerText = 'Викторина';
  } else {
    document.getElementById('burger-main-page').innerText = 'Главная';
    document.getElementById('burger-quiz-page').innerText = 'Викторина';
  }

  quiz = new Quiz(birdsDataRu, birdsTypesRu);
  quiz.init();
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

  quiz = new Quiz(birdsDataEn, birdsTypesEn);
  quiz.init();
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
  quiz = new Quiz(birdsDataRu, birdsTypesRu);
  quiz.init();

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
  quiz = new Quiz(birdsDataEn, birdsTypesEn);
  quiz.init();

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

const burgerIcon = document.querySelector('.header__burger-icon');
const burgerMenu = document.querySelector('.header__burger-menu');
const burgerCloseBtn = document.querySelector('.header__burger-close-btn');

burgerIcon.onclick = () => {
  burgerMenu.classList.toggle('active');
};

burgerCloseBtn.onclick = () => {
  burgerMenu.classList.toggle('active');
};
