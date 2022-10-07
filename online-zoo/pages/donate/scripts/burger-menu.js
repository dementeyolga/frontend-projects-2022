const burgerMenuIcon = document.querySelector(".header__burger-menu"),
  burgerMenu = document.querySelector(".header__menu-burger"),
  burgerMenuContent = document.querySelector(".header__menu-burger-content"),
  burgerMenuBackground = document.querySelector(
    ".header__menu-burger-background"
  ),
  burgerMenuCross = document.querySelector(".header__menu-burger-cross");

burgerMenuIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("active");
});

burgerMenuBackground.addEventListener("click", function () {
  burgerMenu.classList.toggle("active");
});

burgerMenuCross.addEventListener("click", function () {
  burgerMenu.classList.toggle("active");
});
