import './../styles/pages/quiz.scss';
import defaultBirdPicture from './../assets/images/default-bird-img.jpg';
import { birdsData } from './birds/birds-data-ru';

console.log(birdsData);

class Quiz {
  constructor(birdsData) {
    this.birdsData = birdsData;
    this.step = 0;
    this.score = 0;
    this.attempt = 0;
    this.numberOfQuestions = this.birdsData.length;

    this.questionBody = document.querySelector('.question__body');
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
        .addEventListener('click', (event) => {
          if (this.step < this.numberOfQuestions - 1) this.step++;
          console.log(this.step);
          this.updateQuestionNumber();
          this.renderQuestion();
        });
    } else {
      this.questionBtns.innerHTML = `
        <button class="question__buttons-button button button--restart">Restart</button>
        <button class="question__buttons-button button button--results" disabled>Results</button>
      `;
    }

    this.questionBtns
      .querySelector('.button--restart')
      .addEventListener('click', (event) => {
        this.step = 0;
        this.score = 0;

        this.questionBirdDescription.innerHTML = `
        <div class="question__description-text">
          Выберите вариант ответа, чтобы увидеть описание птицы.
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
    this.questionNumber.innerHTML = `${this.step + 1}/${this.birdsData.length}`;
  }

  openCorrectBird(correctBird) {
    let correctBirdInfo = birdsData[this.step].find(
      (item) => item.name === correctBird
    );

    this.questionBody.querySelector('.question__body-picture img').src =
      correctBirdInfo.image;
    this.questionBody.querySelector('.question__body-name').textContent =
      correctBirdInfo.name;
    this.questionBody.querySelector('.question__body-audio audio').src =
      correctBirdInfo.audio;
    console.log(correctBirdInfo);
  }

  renderQuestion() {
    this.attempt = 0;
    this.updateScore();
    this.createButtons();
    this.questionBirdDescription.innerHTML = `
      <div class="question__description-text">
        Выберите вариант ответа, чтобы увидеть описание птицы.
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
          <div class="question__description-top">
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
        if (textContent !== correctAnswer) {
          if (savedThis.attempt < 5) savedThis.attempt++;
          console.log(savedThis.attempt);
        } else {
          savedThis.score += 5 - savedThis.attempt;
          console.log(savedThis.attempt);
          savedThis.updateScore();
          console.log(savedThis.attempt);
          savedThis.attempt = 0;
          savedThis.openCorrectBird(correctAnswer);
          event.target.classList.add('success');
          if (document.querySelector('.button--next')) {
            document.querySelector('.button--next').disabled = false;
          }
          if (document.querySelector('.button--results')) {
            document.querySelector('.button--results').disabled = false;
          }
          this.removeEventListener('click', fn);
        }
      }
    };

    answersContainer.addEventListener('click', displayDescriptionHandler);
    answersContainer.addEventListener('click', updateScoreHandler);
  }
}

const quiz = new Quiz(birdsData);

quiz.init();
