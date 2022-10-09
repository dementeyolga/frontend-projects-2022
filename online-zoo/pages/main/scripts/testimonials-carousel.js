const testimonialsContainer = document.querySelector('.testimonials__cards'),
	popupsContainer = document.querySelector('.testimonials__popups'),
	testimonialsRange = document.querySelector('#testimonials-range');

let testimonials = [];

fetch('./json/testimonials.json')
	.then((response) => response.json())
	.then((list) => {
		testimonials = list;
		let testimonialsHTML = '';
		let popupsHTML = '';

		for (let i = 0; i < testimonials.length; i++) {
			testimonialsHTML += `
            <div class="testimonials__card">
							<div class="testimonials__card-top">
								<div class="testimonials__card-photo">
									<img src="${testimonials[i].picture}" alt="${testimonials[i].name}" />
								</div>
								<div class="testimonials__card-data">
									<div class="testimonials__card-name">${testimonials[i].name}</div>
									<div class="testimonials__card-description">${testimonials[i].description}</div>
								</div>
							</div>
							<div class="testimonials__card-text">
                            ${testimonials[i].review}
							</div>
						</div>
            `;

			popupsHTML += `
							<div class="testimonials__popup">
							<div class="testimonials__popup-cross">✖</div>
							<div class="testimonials__card">
							<div class="testimonials__card-top">
								<div class="testimonials__card-photo">
									<img src="${testimonials[i].picture}" alt="${testimonials[i].name}" />
								</div>
								<div class="testimonials__card-data">
									<div class="testimonials__card-name">${testimonials[i].name}</div>
									<div class="testimonials__card-description">${testimonials[i].description}</div>
								</div>
							</div>
							<div class="testimonials__card-text">
                            ${testimonials[i].review}
							</div>
						</div>
						</div>
			`;
		}

		testimonialsContainer.innerHTML = testimonialsHTML;
		popupsContainer.innerHTML = popupsHTML;

		let testimonialsCards = testimonialsContainer.children;
		let popups = popupsContainer.children;
		let popupCloseIcons = document.querySelectorAll('.testimonials__popup-cross');

		for (let i = 0; i < testimonialsCards.length; i++) {
			testimonialsCards[i].onclick = () => popups[i].classList.toggle('active');
			popupCloseIcons[i].onclick = () => popups[i].classList.toggle('active');
			popups[i].onclick = (event) => {
				if (event.target === popups[i]) {
					popups[i].classList.toggle('active');
				}
			};
		}

		let numberOfCards = document.body.offsetWidth <= 1000 ? 3 : 4;

		testimonialsContainer.style.gap = '30px';
		let cardWidth = `calc(${100 / numberOfCards}% - ${(parseInt(testimonialsContainer.style.gap) * (numberOfCards - 1)) / numberOfCards}px)`;

		for (let i = 0; i < testimonialsCards.length; i++) {
			testimonialsCards[i].style.width = cardWidth;
		}

		testimonialsRange.addEventListener('input', function () {
			testimonialsContainer.style.transform = `translateX(-${
				testimonialsRange.value * (testimonialsCards[0].offsetWidth + parseInt(testimonialsContainer.style.gap))
			}px)`;
		});
	});
