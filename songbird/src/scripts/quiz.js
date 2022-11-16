import './../styles/pages/quiz.scss';
import birdsData from './birds/birds-data-ru';

console.log(birdsData);

function chooseRandomIndex(i) {
  let randInd = Math.trunc(Math.random() * i);

  return randInd;
}

const firstGroup = birdsData[0];

const questionHTML = firstGroup.reduce((html, item) => {});
