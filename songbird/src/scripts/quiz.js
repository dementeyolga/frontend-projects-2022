import './../styles/pages/quiz.scss';
import defaultBirdPicture from './../assets/images/default-bird-img.jpg';
import birdsData from './birds/birds-data-ru';
const questionBody = document.querySelector('.question__body');
const questionAnswers = document.querySelector('.question__answers');
const questionBirdDescription = document.querySelector(
  '.question__bird-description'
);

console.log(birdsData);

function chooseRandomIndex(i) {
  let randInd = Math.trunc(Math.random() * i);

  return randInd;
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
      right: randBird === rightAnswer ? true : false,
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

  let questionBodyHTML = `
        <div class="question__body-picture">
          <img src="${defaultBirdPicture}">
        </div> 

        <div class="question__body-content">
          <div class="question__body-name">****</div>
          <div class="question__body-audio">
            <audio controls src="${rightBirdInfo.audio}">
            </audio>
          </div>
        </div>
  `;

  questionBody.innerHTML = questionBodyHTML;

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
}

const firstGroup = birdsData[0];

renderQuestion(firstGroup);
