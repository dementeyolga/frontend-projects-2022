import './../styles/pages/quiz.scss';
import { CustomAudioPlayer } from './modules/CustomAudioPLayer';
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

    questions[this.step].classList.add('current');
  }

  createAnswers() {
    let arrOfBirdsInfo = this.birdsData[this.step];

    const correctAnswer =
      arrOfBirdsInfo[this.chooseRandomIndex(arrOfBirdsInfo.length)].name;

    console.log(correctAnswer);

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
          failureAudio.play();
        } else if (textContent === correctAnswer) {
          savedThis.score += 5 - savedThis.attempt;
          savedThis.updateScore();
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

    document.querySelector('.button--restart').addEventListener('click', () => {
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
    document.getElementById('gallery-page').innerText = 'Галерея';
  } else {
    document.getElementById('burger-main-page').innerText = 'Главная';
    document.getElementById('burger-quiz-page').innerText = 'Викторина';
    document.getElementById('burger-gallery-page').innerText = 'Галерея';
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
