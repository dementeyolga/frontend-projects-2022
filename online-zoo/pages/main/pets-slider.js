const petsSlider = document.querySelector(".backstage__cards"),
  petsSliderContent = document.querySelector(".backstage__cards-content"),
  rightButton = document.querySelector(".button--right"),
  leftButton = document.querySelector(".button--left");

let pets = [];

const request = new XMLHttpRequest();
request.open("GET", "./pets.json");
request.onload = () => {
  pets = JSON.parse(request.response);

  randomPetsGroup = randomizePets(pets);

  let cardsNumber = window.innerWidth <= 840 ? 4 : 6;

  for (let i = 0; i < cardsNumber; i++) {
    petsSliderContent.innerHTML += `<div class="backstage__card">
                                <div class="backstage__card-image">
                                    <img src="${randomPetsGroup[i].picture}" alt="${randomPetsGroup[i].species}" />
                                </div>
                                <div class="backstage__card-description">
                                    <div class="backstage__card-text">
                                        <div class="backstage__card-title">${randomPetsGroup[i].species}</div>
                                        <div class="backstage__card-subtitle">${randomPetsGroup[i].habitat}</div>
                                    </div>
                                    <div class="backstage__card-icon">
                                        <img
                                        src="${randomPetsGroup[i].foodIcon}"
                                        alt=""
                                        />
                                    </div>
                                </div>
                            </div>`;
  }
};

function randomizePets(pets) {
  const sortedPets = [...pets];

  for (let i = 0; i < sortedPets.length; i++) {
    let randInd = Math.floor(Math.random() * i);
    const randElem = sortedPets.splice(randInd, 1)[0];
    sortedPets.push(randElem);
  }

  return sortedPets;
}

request.send();
