/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_pages_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../styles/pages/main.scss */ \"./src/styles/pages/main.scss\");\n/* harmony import */ var _assets_video_main_video_mp4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../assets/video/main-video.mp4 */ \"./src/assets/video/main-video.mp4\");\n\n\nvar chosenLanguage;\nif (localStorage.getItem('lang')) {\n  chosenLanguage = localStorage.getItem('lang');\n} else {\n  localStorage.setItem('lang', 'ru');\n  chosenLanguage = 'ru';\n}\nif (chosenLanguage === 'ru') {\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Главная';\n    document.getElementById('quiz-page').innerText = 'Викторина';\n    document.getElementById('gallery-page').innerText = 'Галерея';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Главная';\n    document.getElementById('burger-quiz-page').innerText = 'Викторина';\n    document.getElementById('burger-gallery-page').innerText = 'Галерея';\n  }\n  document.querySelector('.button--play').innerText = 'Начать игру';\n} else {\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Main';\n    document.getElementById('quiz-page').innerText = 'Quiz';\n    document.getElementById('gallery-page').innerText = 'Gallery';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Main';\n    document.getElementById('burger-quiz-page').innerText = 'Quiz';\n    document.getElementById('burger-gallery-page').innerText = 'Gallery';\n  }\n  document.querySelector('.button--play').innerText = 'New game';\n}\nvar ruLangBtn;\nvar enLangBtn;\nif (document.body.clientWidth > 576) {\n  ruLangBtn = document.querySelector('#lang-ru');\n  enLangBtn = document.querySelector('#lang-en');\n} else {\n  ruLangBtn = document.querySelector('#burger-lang-ru');\n  enLangBtn = document.querySelector('#burger-lang-en');\n}\nruLangBtn.addEventListener('click', function () {\n  localStorage.setItem('lang', 'ru');\n  document.querySelector('.button--play').innerText = 'Начать игру';\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Главная';\n    document.getElementById('quiz-page').innerText = 'Викторина';\n    document.getElementById('gallery-page').innerText = 'Галерея';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Главная';\n    document.getElementById('burger-quiz-page').innerText = 'Викторина';\n    document.getElementById('burger-gallery-page').innerText = 'Галерея';\n  }\n});\nenLangBtn.addEventListener('click', function () {\n  localStorage.setItem('lang', 'en');\n  document.querySelector('.button--play').innerText = 'New game';\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Main';\n    document.getElementById('quiz-page').innerText = 'Quiz';\n    document.getElementById('gallery-page').innerText = 'Gallery';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Main';\n    document.getElementById('burger-quiz-page').innerText = 'Quiz';\n    document.getElementById('burger-gallery-page').innerText = 'Gallery';\n  }\n});\nvar video = document.createElement('video');\nvideo.src = _assets_video_main_video_mp4__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\nvideo.autoplay = true;\nvideo.controls = false;\nvideo.muted = true;\nvideo.loop = true;\nvar videoContainer = document.querySelector('.video__container');\nvideoContainer.appendChild(video);\nvar header = document.querySelector('.header');\nvideoContainer.style.height = \"calc(100vh - \".concat(header.clientHeight, \"px)\");\nvar burgerIcon = document.querySelector('.header__burger-icon');\nvar burgerMenu = document.querySelector('.header__burger-menu');\nvar burgerCloseBtn = document.querySelector('.header__burger-close-btn');\nburgerIcon.onclick = function () {\n  burgerMenu.classList.toggle('active');\n};\nburgerCloseBtn.onclick = function () {\n  burgerMenu.classList.toggle('active');\n};\n\n//# sourceURL=webpack://songbird/./src/scripts/main.js?");

/***/ }),

/***/ "./src/assets/video/main-video.mp4":
/*!*****************************************!*\
  !*** ./src/assets/video/main-video.mp4 ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"main-video.10d027ee6e6dcaeb644a2e03b9fcb335.mp4\");\n\n//# sourceURL=webpack://songbird/./src/assets/video/main-video.mp4?");

/***/ }),

/***/ "./src/styles/pages/main.scss":
/*!************************************!*\
  !*** ./src/styles/pages/main.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://songbird/./src/styles/pages/main.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/main.js");
/******/ 	
/******/ })()
;