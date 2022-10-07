const reviews = document.querySelectorAll(
		".testimonials__cards .testimonials__card"
	),
	popups = document.querySelectorAll(".testimonials__popup"),
	popupReviews = document.querySelectorAll(
		".testimonials__popup .testimonials__card"
	),
	popupCloseIcons = document.querySelectorAll(".testimonials__popup-cross");

for (let i = 0; i < popups.length; i++) {
	reviews[i].onclick = () => popups[i].classList.toggle("active");
	popupCloseIcons[i].onclick = () => popups[i].classList.toggle("active");
	popups[i].onclick = (event) => {
		if (event.target === popups[i]) {
			popups[i].classList.toggle("active");
		}
	};
}
