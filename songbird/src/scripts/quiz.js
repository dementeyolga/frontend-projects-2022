import './../styles/pages/quiz.scss';
import defaultBirdPicture from './../assets/images/default-bird-img.jpg';
import birdsData from './birds/birds-data-ru';

const questionBody = document.querySelector('.question__body');
const questionAnswers = document.querySelector('.question__answers');
const questionBirdDescription = document.querySelector(
  '.question__description'
);

console.log(birdsData);

function chooseRandomIndex(i) {
  return Math.trunc(Math.random() * i);
}

function createAnswers(arrOfBirdsInfo) {
  const rightAnswer =
    arrOfBirdsInfo[chooseRandomIndex(arrOfBirdsInfo.length)].name;

  const arrOfAnswers = [];
  const birdsNames = arrOfBirdsInfo.map((item) => item.name);

  while (birdsNames.length) {
    let randInd = chooseRandomIndex(birdsNames.length);
    let randBird = birdsNames.splice(randInd, 1)[0];
    let answer = {
      name: randBird,
      right: randBird === rightAnswer,
    };

    arrOfAnswers.push(answer);
  }

  return arrOfAnswers;
}

function renderQuestion(arrOfBirdsInfo) {
  let arrOfAnswers = createAnswers(arrOfBirdsInfo);
  let rightAnswer = arrOfAnswers.find((item) => item.right).name;
  let rightBirdInfo = arrOfBirdsInfo.find((item) => item.name === rightAnswer);

  console.log(rightAnswer, rightBirdInfo);

  questionBody.innerHTML = `
        <div class="question__body-picture">
          <img src="${defaultBirdPicture}" alt="">
        </div> 

        <div class="question__body-content">
          <div class="question__body-name">****</div>
          <div class="question__body-audio">
            <audio controls src="${rightBirdInfo.audio}">
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

  questionAnswers.innerHTML = questionAnswersHTML;

  questionAnswers.addEventListener('click', (event) => {
    if (event.target.classList.contains('question__answers-label')) {
      let currentBirdInfo = arrOfBirdsInfo.find(
        (bird) => bird.name === event.target.innerText
      );

      questionBirdDescription.innerHTML = `
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
  });
}

const firstGroup = birdsData[0];

renderQuestion(firstGroup);
