import './../styles/pages/quiz.scss';
import defaultBirdPicture from './../assets/images/default-bird-img.jpg';
import { birdsData, birdsTypes } from './birds/birds-data-ru';
import successSound from './../assets/audio/success-sound.mp3';
import failureSound from './../assets/audio/wrong-sound.mp3';

console.log(birdsData);

class CustomAudioPlayer {
  constructor(src) {
    this.src = src;
  }

  create() {
    let customPlayer = document.createElement('div');
    customPlayer.classList.add('player');
    customPlayer.innerHTML = `
        <button class="player__play-btn" disabled>
           <span class="player__play-icon">
           paused
           </span>
        </button>
 
        <div class="player__time">
          <span class="player__time-now"></span> / <span class="player__time-duration"></span>
        </div>
 
        <input class="player__search" type="range" min="0" value="0" step="1" disabled/>

        <span class="player__volume-icon">volume__up</span>
        <input class="player__volume-input" type="range" min="0" max="1" value="1" step="0.1" disabled/>
      `;

    const audio = new Audio(this.src),
      playBtn = customPlayer.querySelector('.player__play-btn'),
      playIcon = customPlayer.querySelector('.player__play-icon'),
      currentTime = customPlayer.querySelector('.player__time-now'),
      duration = customPlayer.querySelector('.player__time-duration'),
      searchInput = customPlayer.querySelector('.player__search'),
      volumeInput = customPlayer.querySelector('.player__volume-input'),
      volumeIcon = customPlayer.querySelector('.player__volume-icon');

    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.onplay = () => {
      playIcon.innerHTML = 'pause';
    };
    audio.onpause = () => {
      playIcon.innerHTML = 'play_arrow';
    };

    const timeString = (secs) => {
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

    audio.onloadstart = () => {
      currentTime.innerHTML = 'Loading';
      duration.innerHTML = '';
    };

    audio.onloadedmetadata = () => {
      currentTime.innerHTML = timeString(0);
      duration.innerHTML = timeString(audio.duration);

      searchInput.max = Math.floor(audio.duration);

      let isSearching = false;
      searchInput.oninput = () => {
        isSearching = true;
      };
      searchInput.onchange = () => {
        audio.currentTime = searchInput.value;
        if (!audio.paused) audio.play();
        isSearching = false;
      };

      audio.ontimeupdate = () => {
        if (!isSearching) {
          searchInput.value = Math.floor(audio.currentTime);
        }
      };
    };

    audio.ontimeupdate = () => {
      currentTime.innerHTML = timeString(audio.currentTime);
    };

    volumeInput.onchange = () => {
      audio.volume = volumeInput.value;
      volumeIcon.innerHTML =
        volumeInput.value === 0 ? 'volume_mute' : 'volume_up';
    };

    audio.oncanplaythrough = () => {
      playBtn.disabled = false;
      volumeInput.disabled = false;
      searchInput.disabled = false;
    };

    audio.onwaiting = () => {
      playBtn.disabled = true;
      volumeInput.disabled = true;
      searchInput.disabled = true;
    };

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

    this.successSound = new Audio(successSound);
    this.failureSound = new Audio(failureSound);

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
      this.questionBtns.innerHTML = `
        <button class="question__buttons-button button button--restart">Restart</button>
        <button class="question__buttons-button button button--next" disabled>Next Question</button>
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
      this.questionBtns.innerHTML = `
        <button class="question__buttons-button button button--restart">Restart</button>
        <button class="question__buttons-button button button--result" disabled>Results</button>
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

        this.questionBirdDescription.innerHTML = `
        <div class="question__description-text">
          Прослушай запись пения птицы и выбери подходящий ответ
        </div>
        `;

        this.updateQuestionNumber();
        this.renderQuestion();
      });
  }

  updateScore() {
    this.questionScore.innerHTML = `Счет: ${this.score}`;
  }

  updateQuestionNumber() {
    this.questionNumber.innerHTML = `${this.step + 1}/${
      this.numberOfQuestions
    }`;
  }

  openCorrectBird(correctBird) {
    let correctBirdInfo = birdsData[this.step].find(
      (item) => item.name === correctBird
    );

    this.questionBody.querySelector('.question__body-picture img').src =
      correctBirdInfo.image;
    this.questionBody.querySelector(
      '.question__body-name'
    ).textContent = `${correctBirdInfo.name} (${correctBirdInfo.species})`;
    this.questionBody.querySelector('.question__body-audio audio').src =
      correctBirdInfo.audio;
    console.log(correctBirdInfo);
  }

  renderQuestion() {
    this.attempt = 0;
    this.renderQuestionList();
    this.updateScore();
    this.createButtons();
    this.questionBirdDescription.innerHTML = `
      <div class="question__description-text">
        Прослушай запись пения птицы и выбери подходящий ответ
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
              <audio controls src="${correctBirdInfo.audio}">
              </audio>
            </div>
          </div>
    `;

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
        <div class="question__description-name">${correctBirdInfo.name} (${correctBirdInfo.species})</div>
          <div class="question__description-middle">
            <div class="question__description-picture">
              <img src="${currentBirdInfo.image}" alt="${currentBirdInfo.name}">
            </div>
            <div class="question__description-audio">
                <audio controls src="${currentBirdInfo.audio}">
                </audio>
             </div>
          </div>
          <div class="question__description-text">${currentBirdInfo.description}</div>
        `;
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
          savedThis.failureSound.play();
          console.log(savedThis.attempt);
        } else if (textContent === correctAnswer) {
          savedThis.score += 5 - savedThis.attempt;
          console.log(savedThis.attempt);
          savedThis.updateScore();
          console.log(savedThis.attempt);
          savedThis.attempt = 0;
          event.target.classList.add('success');
          const audio = document.querySelector('.question__body-audio audio');
          audio.pause();
          savedThis.openCorrectBird(correctAnswer);
          savedThis.successSound.play();

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
    if (this.score < this.maxScore) {
      document.querySelector('.main').innerHTML = `
      <div class="result">
        <p class="result__info">You finished the quiz with ${this.score}/${this.maxScore} points. Congratulations! </p>
        <button class="question__buttons-button button button--restart">Играть снова</button>
      </div>
    `;
    } else {
      document.querySelector('.main').innerHTML = `
        <div class="result">
          <p class="result__info">You finished the quiz with ${this.score}/${this.maxScore} points. Congratulations! </p>
          <button class="question__buttons-button button button--restart">Играть снова</button>
        </div>
      `;

      this.questionBtns
        .querySelector('.button--restart')
        .addEventListener('click', () => {
          this.step = 0;
          this.score = 0;

          this.updateQuestionNumber();
          this.renderQuestion();

          this.questionBirdDescription.innerHTML = `
        <div class="question__description-text">
          Прослушай запись пения птицы и выбери подходящий ответ
        </div>
        `;
        });
    }

    this.questionBtns
      .querySelector('.button--restart')
      .addEventListener('click', () => {
        this.step = 0;
        this.score = 0;

        this.questionBirdDescription.innerHTML = `
      <div class="question__description-text">
        Прослушай запись пения птицы и выбери подходящий ответ
      </div>
      `;

        this.updateQuestionNumber();
        this.renderQuestion();
      });
  }
}

const player = new CustomAudioPlayer(
  'https://www.xeno-canto.org/sounds/uploaded/WOEAFQRMUD/XC293087-Diomedea%20exulans151120_T254.mp3'
);

const playerElem = player.create();
console.log(playerElem);

document.body.append(playerElem);

// const quiz = new Quiz(birdsData, birdsTypes);
//
// quiz.init();
