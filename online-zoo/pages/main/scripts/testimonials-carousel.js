const testimonialsContainer = document.querySelector('.testimonials__cards');
let testimonials = [];

fetch('./json/testimonials.json')
	.then((response) => response.json())
	.then((list) => {
		testimonials = list;

		for (let i = 0; i < testimonials.length; i++) {
			testimonialsContainer.innerHTML += `
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
		}

		let testimonialsCards = testimonialsContainer.children;

		for (let i = 0; i < testimonialsCards.length; i++) {
			testimonialsCards[i].style.width = '25%';
		}
	});
