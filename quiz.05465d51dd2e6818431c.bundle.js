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

/***/ "./src/scripts/quiz.js":
/*!*****************************!*\
  !*** ./src/scripts/quiz.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_pages_quiz_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../styles/pages/quiz.scss */ \"./src/styles/pages/quiz.scss\");\n/* harmony import */ var _modules_CustomAudioPLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/CustomAudioPLayer */ \"./src/scripts/modules/CustomAudioPLayer.js\");\n/* harmony import */ var _assets_images_default_bird_img_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../assets/images/default-bird-img.jpg */ \"./src/assets/images/default-bird-img.jpg\");\n/* harmony import */ var _assets_audio_success_sound_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../assets/audio/success-sound.mp3 */ \"./src/assets/audio/success-sound.mp3\");\n/* harmony import */ var _assets_audio_wrong_sound_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../assets/audio/wrong-sound.mp3 */ \"./src/assets/audio/wrong-sound.mp3\");\n/* harmony import */ var _birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./birds/birds-data-ru */ \"./src/scripts/birds/birds-data-ru.js\");\n/* harmony import */ var _birds_birds_data_en__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./birds/birds-data-en */ \"./src/scripts/birds/birds-data-en.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n\n\n\n\nvar Quiz = /*#__PURE__*/function () {\n  function Quiz(birdsData, birdsTypes) {\n    _classCallCheck(this, Quiz);\n    this.birdsData = birdsData;\n    this.birdsTypes = birdsTypes;\n    this.step = 0;\n    this.score = 0;\n    this.attempt = 0;\n    this.maxQuestionScore = 5;\n    this.numberOfQuestions = this.birdsData.length;\n    this.maxScore = this.numberOfQuestions * this.maxQuestionScore;\n    this.successSoundFile = _assets_audio_success_sound_mp3__WEBPACK_IMPORTED_MODULE_3__;\n    this.failureSoundFile = _assets_audio_wrong_sound_mp3__WEBPACK_IMPORTED_MODULE_4__;\n    this.questionBody = document.querySelector('.question__body');\n    this.questionList = document.querySelector('.question__list');\n    this.questionAnswers = document.querySelector('.question__answers');\n    this.questionBirdDescription = document.querySelector('.question__description');\n    this.questionScore = document.querySelector('.question__score');\n    this.questionBtns = document.querySelector('.question__buttons');\n    this.questionNumber = document.querySelector('.question__number');\n  }\n  _createClass(Quiz, [{\n    key: \"init\",\n    value: function init() {\n      this.renderQuestion();\n      this.updateQuestionNumber();\n    }\n  }, {\n    key: \"chooseRandomIndex\",\n    value: function chooseRandomIndex(i) {\n      return Math.trunc(Math.random() * i);\n    }\n  }, {\n    key: \"renderQuestionList\",\n    value: function renderQuestionList() {\n      var questionListHTML = '';\n      for (var i = 0; i < this.numberOfQuestions; i++) {\n        questionListHTML += \"\\n        <div class=\\\"question__list-item\\\">\".concat(this.birdsTypes[i], \"</div>\\n      \");\n      }\n      this.questionList.innerHTML = questionListHTML;\n      var questions = document.querySelectorAll('.question__list-item');\n      questions[this.step].classList.add('current');\n    }\n  }, {\n    key: \"createAnswers\",\n    value: function createAnswers() {\n      var arrOfBirdsInfo = this.birdsData[this.step];\n      var correctAnswer = arrOfBirdsInfo[this.chooseRandomIndex(arrOfBirdsInfo.length)].name;\n      console.log(correctAnswer);\n      var arrOfAnswers = [];\n      var birdsNames = arrOfBirdsInfo.map(function (item) {\n        return item.name;\n      });\n      while (birdsNames.length) {\n        var randInd = this.chooseRandomIndex(birdsNames.length);\n        var randBird = birdsNames.splice(randInd, 1)[0];\n        var answer = {\n          name: randBird,\n          correct: randBird === correctAnswer\n        };\n        arrOfAnswers.push(answer);\n      }\n      return arrOfAnswers;\n    }\n  }, {\n    key: \"createButtons\",\n    value: function createButtons() {\n      var _this = this;\n      if (this.step < this.numberOfQuestions - 1) {\n        var restartStr = localStorage.getItem('lang') === 'ru' ? 'Начать сначала' : 'Restart';\n        var nextQuestionStr = localStorage.getItem('lang') === 'ru' ? 'Следующий вопрос' : 'Next question';\n        this.questionBtns.innerHTML = \"\\n        <button class=\\\"question__buttons-button button button--restart\\\">\".concat(restartStr, \"</button>\\n        <button class=\\\"question__buttons-button button button--next\\\" disabled>\").concat(nextQuestionStr, \"</button>\\n      \");\n        this.questionBtns.querySelector('.button--next').addEventListener('click', function () {\n          if (_this.step < _this.numberOfQuestions - 1) _this.step++;\n          _this.updateQuestionNumber();\n          _this.renderQuestion();\n        });\n      } else {\n        var _restartStr = localStorage.getItem('lang') === 'ru' ? 'Начать сначала' : 'Restart';\n        var resultsStr = localStorage.getItem('lang') === 'ru' ? 'Результат' : 'Result';\n        this.questionBtns.innerHTML = \"\\n        <button class=\\\"question__buttons-button button button--restart\\\">\".concat(_restartStr, \"</button>\\n        <button class=\\\"question__buttons-button button button--result\\\" disabled>\").concat(resultsStr, \"</button>\\n      \");\n        this.questionBtns.querySelector('.button--result').addEventListener('click', function () {\n          _this.renderResult();\n        });\n      }\n      this.questionBtns.querySelector('.button--restart').addEventListener('click', function () {\n        _this.step = 0;\n        _this.score = 0;\n        var descriptionStr = localStorage.getItem('lang') === 'ru' ? 'Прослушай запись пения птицы и выбери подходящую птицу' : 'Listen to the audio and choose the right bird';\n        _this.questionBirdDescription.innerHTML = \"\\n        <div class=\\\"question__description-text\\\">\\n          \".concat(descriptionStr, \"\\n        </div>\\n        \");\n        _this.updateQuestionNumber();\n        _this.renderQuestion();\n      });\n    }\n  }, {\n    key: \"updateScore\",\n    value: function updateScore() {\n      var scoreStr = localStorage.getItem('lang') === 'ru' ? \"\\u0421\\u0447\\u0435\\u0442: \".concat(this.score) : \"Score: \".concat(this.score);\n      this.questionScore.innerHTML = \"\\n        <div class=\\\"question__description-text\\\">\\n          \".concat(scoreStr, \"\\n        </div>\\n        \");\n    }\n  }, {\n    key: \"updateQuestionNumber\",\n    value: function updateQuestionNumber() {\n      this.questionNumber.innerHTML = \"\".concat(this.step + 1, \"/\").concat(this.numberOfQuestions);\n    }\n  }, {\n    key: \"openCorrectBird\",\n    value: function openCorrectBird(correctBird) {\n      var correctBirdInfo = this.birdsData[this.step].find(function (item) {\n        return item.name === correctBird;\n      });\n      this.questionBody.querySelector('.question__body-picture img').src = correctBirdInfo.image;\n      this.questionBody.querySelector('.question__body-name').textContent = \"\".concat(correctBirdInfo.name, \" (\").concat(correctBirdInfo.species, \")\");\n      var customPlayer = new _modules_CustomAudioPLayer__WEBPACK_IMPORTED_MODULE_1__.CustomAudioPlayer(correctBirdInfo.audio);\n      this.questionBody.querySelector('.question__body-audio').innerHTML = '';\n      this.questionBody.querySelector('.question__body-audio').append(customPlayer.create());\n    }\n  }, {\n    key: \"renderQuestion\",\n    value: function renderQuestion() {\n      var _this2 = this;\n      this.attempt = 0;\n      this.renderQuestionList();\n      this.updateScore();\n      this.createButtons();\n      var descriptionStr = localStorage.getItem('lang') === 'ru' ? 'Прослушай запись пения птицы и выбери подходящую птицу' : 'Listen to the audio and choose the right bird';\n      this.questionBirdDescription.innerHTML = \"\\n        <div class=\\\"question__description-text\\\">\\n          \".concat(descriptionStr, \"\\n          </div>\\n          \");\n      var arrOfBirdsInfo = this.birdsData[this.step];\n      var arrOfAnswers = this.createAnswers(arrOfBirdsInfo);\n      var correctAnswer = arrOfAnswers.find(function (item) {\n        return item.correct;\n      }).name;\n      var correctBirdInfo = arrOfBirdsInfo.find(function (item) {\n        return item.name === correctAnswer;\n      });\n      this.questionBody.innerHTML = \"\\n          <div class=\\\"question__body-picture\\\">\\n            <img src=\\\"\".concat(_assets_images_default_bird_img_jpg__WEBPACK_IMPORTED_MODULE_2__, \"\\\" alt=\\\"\\\">\\n          </div> \\n  \\n          <div class=\\\"question__body-content\\\">\\n            <div class=\\\"question__body-name\\\">****</div>\\n            <div class=\\\"question__body-audio\\\">\\n            </div>\\n          </div>\\n    \");\n      var customPlayer = new _modules_CustomAudioPLayer__WEBPACK_IMPORTED_MODULE_1__.CustomAudioPlayer(correctBirdInfo.audio);\n      this.questionBody.querySelector('.question__body-audio').append(customPlayer.create());\n      var questionAnswersHTML = '';\n      for (var i = 0; i < arrOfAnswers.length; i++) {\n        questionAnswersHTML += \"\\n      <input class=\\\"question__answers-input\\\" type=\\\"radio\\\" name=\\\"bird-answer\\\" id=\\\"bird-answer-\".concat(i, \"\\\"/> \\n      <label for=\\\"bird-answer-\").concat(i, \"\\\" class=\\\"question__answers-label\\\">\\n        \").concat(arrOfAnswers[i].name, \"\\n      </label> \\n      \");\n      }\n      this.questionAnswers.innerHTML = \"<div class=\\\"question__answers-container\\\"></div>\";\n      var answersContainer = this.questionAnswers.querySelector('.question__answers-container');\n      answersContainer.innerHTML = questionAnswersHTML;\n      var displayDescriptionHandler = function displayDescriptionHandler(event) {\n        if (event.target.classList.contains('question__answers-label')) {\n          var currentBirdInfo = arrOfBirdsInfo.find(function (bird) {\n            return bird.name === event.target.innerText;\n          });\n          _this2.questionBirdDescription.innerHTML = \"\\n        <div class=\\\"question__description-name\\\">\".concat(currentBirdInfo.name, \" (\").concat(currentBirdInfo.species, \")</div>\\n          <div class=\\\"question__description-middle\\\">\\n            <div class=\\\"question__description-picture\\\">\\n              <img src=\\\"\").concat(currentBirdInfo.image, \"\\\" alt=\\\"\").concat(currentBirdInfo.name, \"\\\">\\n            </div>\\n            <div class=\\\"question__description-audio\\\">\\n             </div>\\n          </div>\\n          <div class=\\\"question__description-text\\\">\").concat(currentBirdInfo.description, \"</div>\\n        \");\n          var _customPlayer = new _modules_CustomAudioPLayer__WEBPACK_IMPORTED_MODULE_1__.CustomAudioPlayer(currentBirdInfo.audio);\n          _this2.questionBirdDescription.querySelector('.question__description-audio').append(_customPlayer.create());\n        }\n      };\n      var savedThis = this;\n      var updateScoreHandler = function fn(event) {\n        if (event.target.classList.contains('question__answers-label')) {\n          var textContent = event.target.textContent.trim();\n          if (textContent !== correctAnswer && !event.target.classList.contains('wrong')) {\n            if (savedThis.attempt < 5) savedThis.attempt++;\n            event.target.classList.add('wrong');\n            var failureAudio = new Audio(_assets_audio_wrong_sound_mp3__WEBPACK_IMPORTED_MODULE_4__);\n            failureAudio.play();\n          } else if (textContent === correctAnswer) {\n            savedThis.score += 5 - savedThis.attempt;\n            savedThis.updateScore();\n            savedThis.attempt = 0;\n            event.target.classList.add('success');\n            var pauseBtn = document.querySelector('.question__body-audio .playing');\n            if (pauseBtn) pauseBtn.click();\n            savedThis.openCorrectBird(correctAnswer);\n            var successAudio = new Audio(_assets_audio_success_sound_mp3__WEBPACK_IMPORTED_MODULE_3__);\n            successAudio.play();\n            if (document.querySelector('.button--next')) {\n              document.querySelector('.button--next').disabled = false;\n            }\n            if (document.querySelector('.button--result')) {\n              document.querySelector('.button--result').disabled = false;\n            }\n            this.removeEventListener('click', fn);\n          }\n        }\n      };\n      answersContainer.addEventListener('click', displayDescriptionHandler);\n      answersContainer.addEventListener('click', updateScoreHandler);\n    }\n  }, {\n    key: \"renderResult\",\n    value: function renderResult() {\n      var _this3 = this;\n      var resultInfo;\n      if (this.score < this.maxScore) {\n        resultInfo = localStorage.getItem('lang') === 'ru' ? \"\\u0412\\u044B \\u043D\\u0430\\u0431\\u0440\\u0430\\u043B\\u0438 \".concat(this.score, \"/\").concat(this.maxScore, \" \\u0431\\u0430\\u043B\\u043B\\u043E\\u0432. \\u0418\\u0433\\u0440\\u0430\\u0442\\u044C \\u0441\\u043D\\u043E\\u0432\\u0430?\") : \"You finished the quiz with \".concat(this.score, \"/\").concat(this.maxScore, \" points. Want to try again?\");\n      } else {\n        resultInfo = localStorage.getItem('lang') === 'ru' ? \"\\u0412\\u044B \\u043D\\u0430\\u0431\\u0440\\u0430\\u043B\\u0438 \\u043C\\u0430\\u043A\\u0441\\u0438\\u043C\\u0443\\u043C \\u0431\\u0430\\u043B\\u043B\\u043E\\u0432 (\".concat(this.score, \"/\").concat(this.maxScore, \"). \\u041F\\u043E\\u0437\\u0434\\u0440\\u0430\\u0432\\u043B\\u044F\\u044E!\") : \"You finished the quiz with \".concat(this.score, \"/\").concat(this.maxScore, \" points. Congratulations!\");\n      }\n      var restartStr = localStorage.getItem('lang') === 'ru' ? \"\\u0418\\u0433\\u0440\\u0430\\u0442\\u044C \\u0441\\u043D\\u043E\\u0432\\u0430\" : \"Play again\";\n      this.questionBody.innerHTML = '';\n      this.questionBtns.innerHTML = '';\n      document.querySelector('.question__bottom').innerHTML = \"\\n        <div class=\\\"result\\\">\\n          <p class=\\\"result__info\\\">\".concat(resultInfo, \"</p>\\n          <button class=\\\"question__buttons-button button button--restart\\\">\").concat(restartStr, \"</button>\\n        </div>\\n      \");\n      this.questionBtns.querySelector('.button--restart').addEventListener('click', function () {\n        _this3.step = 0;\n        _this3.score = 0;\n        var descriptionStr = localStorage.getItem('lang') === 'ru' ? 'Прослушай запись пения птицы и выбери подходящую птицу' : 'Listen to the audio and choose the right bird';\n        _this3.questionBirdDescription.innerHTML = \"\\n        <div class=\\\"question__description-text\\\">\\n          \".concat(descriptionStr, \"\\n        </div>\\n      \");\n        _this3.updateQuestionNumber();\n        _this3.renderQuestion();\n      });\n    }\n  }]);\n  return Quiz;\n}();\nvar chosenLanguage;\nif (localStorage.getItem('lang')) {\n  chosenLanguage = localStorage.getItem('lang');\n} else {\n  localStorage.setItem('lang', 'ru');\n  chosenLanguage = 'ru';\n}\nvar quiz;\nif (chosenLanguage === 'ru') {\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Главная';\n    document.getElementById('quiz-page').innerText = 'Викторина';\n    document.getElementById('gallery-page').innerText = 'Галерея';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Главная';\n    document.getElementById('burger-quiz-page').innerText = 'Викторина';\n    document.getElementById('burger-gallery-page').innerText = 'Галерея';\n  }\n  quiz = new Quiz(_birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_5__.birdsData, _birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_5__.birdsTypes);\n  quiz.init();\n} else {\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Main';\n    document.getElementById('quiz-page').innerText = 'Quiz';\n    document.getElementById('gallery-page').innerText = 'Gallery';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Main';\n    document.getElementById('burger-quiz-page').innerText = 'Quiz';\n    document.getElementById('burger-gallery-page').innerText = 'Gallery';\n  }\n  quiz = new Quiz(_birds_birds_data_en__WEBPACK_IMPORTED_MODULE_6__.birdsData, _birds_birds_data_en__WEBPACK_IMPORTED_MODULE_6__.birdsTypes);\n  quiz.init();\n}\nvar ruLangBtn;\nvar enLangBtn;\nif (document.body.clientWidth > 576) {\n  ruLangBtn = document.querySelector('#lang-ru');\n  enLangBtn = document.querySelector('#lang-en');\n} else {\n  ruLangBtn = document.querySelector('#burger-lang-ru');\n  enLangBtn = document.querySelector('#burger-lang-en');\n}\nruLangBtn.addEventListener('click', function () {\n  localStorage.setItem('lang', 'ru');\n  quiz = new Quiz(_birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_5__.birdsData, _birds_birds_data_ru__WEBPACK_IMPORTED_MODULE_5__.birdsTypes);\n  quiz.init();\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Главная';\n    document.getElementById('quiz-page').innerText = 'Викторина';\n    document.getElementById('gallery-page').innerText = 'Галерея';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Главная';\n    document.getElementById('burger-quiz-page').innerText = 'Викторина';\n    document.getElementById('burger-gallery-page').innerText = 'Галерея';\n  }\n});\nenLangBtn.addEventListener('click', function () {\n  localStorage.setItem('lang', 'en');\n  quiz = new Quiz(_birds_birds_data_en__WEBPACK_IMPORTED_MODULE_6__.birdsData, _birds_birds_data_en__WEBPACK_IMPORTED_MODULE_6__.birdsTypes);\n  quiz.init();\n  if (document.body.clientWidth > 576) {\n    document.getElementById('main-page').innerText = 'Main';\n    document.getElementById('quiz-page').innerText = 'Quiz';\n    document.getElementById('gallery-page').innerText = 'Gallery';\n  } else {\n    document.getElementById('burger-main-page').innerText = 'Main';\n    document.getElementById('burger-quiz-page').innerText = 'Quiz';\n    document.getElementById('burger-gallery-page').innerText = 'Gallery';\n  }\n});\nvar burgerIcon = document.querySelector('.header__burger-icon');\nvar burgerMenu = document.querySelector('.header__burger-menu');\nvar burgerCloseBtn = document.querySelector('.header__burger-close-btn');\nburgerIcon.onclick = function () {\n  burgerMenu.classList.toggle('active');\n};\nburgerCloseBtn.onclick = function () {\n  burgerMenu.classList.toggle('active');\n};\n\n//# sourceURL=webpack://songbird/./src/scripts/quiz.js?");

/***/ }),

/***/ "./src/styles/pages/quiz.scss":
/*!************************************!*\
  !*** ./src/styles/pages/quiz.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://songbird/./src/styles/pages/quiz.scss?");

/***/ }),

/***/ "./src/assets/audio/success-sound.mp3":
/*!********************************************!*\
  !*** ./src/assets/audio/success-sound.mp3 ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"5f1fee46481f6a9e2585.mp3\";\n\n//# sourceURL=webpack://songbird/./src/assets/audio/success-sound.mp3?");

/***/ }),

/***/ "./src/assets/audio/wrong-sound.mp3":
/*!******************************************!*\
  !*** ./src/assets/audio/wrong-sound.mp3 ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d682aa45d3662bf41de2.mp3\";\n\n//# sourceURL=webpack://songbird/./src/assets/audio/wrong-sound.mp3?");

/***/ }),

/***/ "./src/assets/images/default-bird-img.jpg":
/*!************************************************!*\
  !*** ./src/assets/images/default-bird-img.jpg ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"6dcc23c5350c53f8f195.jpg\";\n\n//# sourceURL=webpack://songbird/./src/assets/images/default-bird-img.jpg?");

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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"quiz": 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src_scripts_birds_birds-data-en_js-src_scripts_birds_birds-data-ru_js-src_scripts_modules_Cus-c41938"], () => (__webpack_require__("./src/scripts/quiz.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;