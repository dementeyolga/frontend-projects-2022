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

/***/ "./src/scripts/gallery.js":
/*!********************************!*\
  !*** ./src/scripts/gallery.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_pages_gallery_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../styles/pages/gallery.scss */ \"./src/styles/pages/gallery.scss\");\n/* harmony import */ var _modules_CustomAudioPLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/CustomAudioPLayer */ \"./src/scripts/modules/CustomAudioPLayer.js\");\n/* harmony import */ var _birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./birds/birds-data-ru */ \"./src/scripts/birds/birds-data-ru.js\");\n/* harmony import */ var _birds_birds_data_en__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./birds/birds-data-en */ \"./src/scripts/birds/birds-data-en.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n\nvar Gallery = /*#__PURE__*/function () {\n  function Gallery(birdsData, birdsTypes) {\n    _classCallCheck(this, Gallery);\n    this.birdsData = birdsData;\n    this.birdsTypes = birdsTypes;\n    this.numberOfCards = this.birdsData.length;\n    this.galleryElem = document.querySelector('.gallery');\n  }\n  _createClass(Gallery, [{\n    key: \"init\",\n    value: function init() {\n      this.galleryElem.innerHTML = '';\n      for (var i = 0; i < this.birdsData.length; i++) {\n        for (var j = 0; j < this.birdsData[i].length; j++) {\n          var currentBird = this.birdsData[i][j];\n          var birdElem = document.createElement('div');\n          birdElem.classList.add('gallery__card');\n          birdElem.innerHTML = \"\\n        <div class=\\\"gallery__card-picture\\\">\\n          <img src=\\\"\".concat(currentBird.image, \"\\\" alt=\\\"\").concat(currentBird.name, \"\\\">\\n        </div> \\n\\n        <div class=\\\"gallery__card-content\\\">\\n          <div class=\\\"gallery__card-name\\\">\").concat(currentBird.name, \" (\").concat(currentBird.species, \")</div>\\n          <div class=\\\"gallery__card-audio\\\">\\n          </div>\\n          <div class=\\\"gallery__card-description\\\">\\n            \").concat(currentBird.description, \"\\n          </div>\\n        </div>\\n      \");\n          var customPlayer = new _modules_CustomAudioPLayer__WEBPACK_IMPORTED_MODULE_1__.CustomAudioPlayer(currentBird.audio);\n          birdElem.querySelector('.gallery__card-audio').append(customPlayer.create());\n          this.galleryElem.append(birdElem);\n        }\n      }\n    }\n  }]);\n  return Gallery;\n}();\nvar gallery;\nvar chosenLanguage;\nif (localStorage.getItem('lang')) {\n  chosenLanguage = localStorage.getItem('lang');\n} else {\n  localStorage.setItem('lang', 'ru');\n  chosenLanguage = 'ru';\n}\nif (chosenLanguage === 'ru') {\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Главная';\n    document.getElementById('quiz-page').innerText = 'Викторина';\n    document.getElementById('gallery-page').innerText = 'Галерея';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Главная';\n    document.getElementById('burger-quiz-page').innerText = 'Викторина';\n    document.getElementById('burger-gallery-page').innerText = 'Галерея';\n  }\n  document.querySelector('h1').innerText = 'Галерея птиц';\n  gallery = new Gallery(_birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_2__.birdsData, _birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_2__.birdsTypes);\n  gallery.init();\n} else {\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Main';\n    document.getElementById('quiz-page').innerText = 'Quiz';\n    document.getElementById('gallery-page').innerText = 'Gallery';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Main';\n    document.getElementById('burger-quiz-page').innerText = 'Quiz';\n    document.getElementById('burger-gallery-page').innerText = 'Gallery';\n  }\n  document.querySelector('h1').innerText = 'Bird gallery';\n  gallery = new Gallery(_birds_birds_data_en__WEBPACK_IMPORTED_MODULE_3__.birdsData, _birds_birds_data_en__WEBPACK_IMPORTED_MODULE_3__.birdsTypes);\n  gallery.init();\n}\nvar ruLangBtn;\nvar enLangBtn;\nif (document.body.clientWidth > 576) {\n  ruLangBtn = document.querySelector('#lang-ru');\n  enLangBtn = document.querySelector('#lang-en');\n} else {\n  ruLangBtn = document.querySelector('#burger-lang-ru');\n  enLangBtn = document.querySelector('#burger-lang-en');\n}\nruLangBtn.addEventListener('click', function () {\n  localStorage.setItem('lang', 'ru');\n  document.querySelector('h1').innerText = 'Галерея птиц';\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Главная';\n    document.getElementById('quiz-page').innerText = 'Викторина';\n    document.getElementById('gallery-page').innerText = 'Галерея';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Главная';\n    document.getElementById('burger-quiz-page').innerText = 'Викторина';\n    document.getElementById('burger-gallery-page').innerText = 'Галерея';\n  }\n  gallery = new Gallery(_birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_2__.birdsData, _birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_2__.birdsTypes);\n  gallery.init();\n});\nenLangBtn.addEventListener('click', function () {\n  localStorage.setItem('lang', 'en');\n  document.querySelector('h1').innerText = 'Bird gallery';\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Main';\n    document.getElementById('quiz-page').innerText = 'Quiz';\n    document.getElementById('gallery-page').innerText = 'Gallery';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Main';\n    document.getElementById('burger-quiz-page').innerText = 'Quiz';\n    document.getElementById('burger-gallery-page').innerText = 'Gallery';\n  }\n  gallery = new Gallery(_birds_birds_data_en__WEBPACK_IMPORTED_MODULE_3__.birdsData, _birds_birds_data_en__WEBPACK_IMPORTED_MODULE_3__.birdsTypes);\n  gallery.init();\n});\nvar burgerIcon = document.querySelector('.header__burger-icon');\nvar burgerMenu = document.querySelector('.header__burger-menu');\nvar burgerCloseBtn = document.querySelector('.header__burger-close-btn');\nburgerIcon.onclick = function () {\n  burgerMenu.classList.toggle('active');\n};\nburgerCloseBtn.onclick = function () {\n  burgerMenu.classList.toggle('active');\n};\n\n//# sourceURL=webpack://songbird/./src/scripts/gallery.js?");

/***/ }),

/***/ "./src/styles/pages/gallery.scss":
/*!***************************************!*\
  !*** ./src/styles/pages/gallery.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://songbird/./src/styles/pages/gallery.scss?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"gallery": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksongbird"] = self["webpackChunksongbird"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src_scripts_birds_birds-data-en_js-src_scripts_birds_birds-data-ru_js-src_scripts_modules_Cus-c41938"], () => (__webpack_require__("./src/scripts/gallery.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;