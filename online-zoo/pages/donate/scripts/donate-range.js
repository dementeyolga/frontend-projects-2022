let donateRange = document.querySelector('#range__input-desktop'),
	donateNumImput = document.querySelector('.help__amount-input');

if (document.body.offsetWidth <= 840) {
	donateRange.max = '5';
} else if (document.body.offsetWidth <= 1000) {
	donateRange.max = '7';
}
