const petsSlider = document.querySelector('.backstage__cards'),
	petsSliderContent = document.querySelector('.backstage__cards-content'),
	rightButton = document.querySelector('.button--right'),
	leftButton = document.querySelector('.button--left');

let pets = [];

const request = new XMLHttpRequest();
request.open('GET', './pets.json');
request.onload = () => {
	pets = JSON.parse(request.response);

	randomPetsGroup = randomizePets(pets);

	petsSliderContent.innerHTML = createPets(randomPetsGroup);

	rightButton.addEventListener('click', function () {
		let newPetsCards = document.createElement('div');
		newPetsCards.setAttribute('class', 'backstage__cards-content');

		let randomPets = randomizePets(pets);
		newPetsCards.innerHTML = createPets(randomPets);
		newPetsCards.classList.add('left');

		let firstPetCards = petsSlider.children[0];
		firstPetCards.classList.add('fadeLeft');

		petsSlider.appendChild(newPetsCards);
	});
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

function createPets(randomPetsGroup) {
	let cardsNumber = window.innerWidth <= 840 ? 4 : 6;

	let petCards = ``;

	for (let i = 0; i < cardsNumber; i++) {
		petCards += `<div class="backstage__card">
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

	return petCards;
}

request.send();
