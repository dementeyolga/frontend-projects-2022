let donateRange = document.querySelector('#range__input-desktop'),
	donateNumInput = document.querySelector('.help__amount-input'),
	donateSums = document.querySelectorAll('.help__range-number');

if (document.body.offsetWidth <= 840) {
	donateRange.max = '5';
} else if (document.body.offsetWidth <= 1000) {
	donateRange.max = '7';
}

let arrayOfSums = [];

for (let i = 0; i < donateSums.length; i++) {
	let inputContent = donateSums[i].textContent;
	arrayOfSums.push(inputContent.substring(1));
}

donateRange.addEventListener('input', function () {
	donateNumInput.value = arrayOfSums[donateRange.value];
});

donateNumInput.addEventListener('input', function () {
	if (arrayOfSums.includes(donateNumInput.value)) {
		donateRange.value = arrayOfSums.indexOf(donateNumInput.value);
	}
});

donateRange.value = donateRange.max - 2;
donateNumInput.value = arrayOfSums[donateRange.max - 2];
