class GemPuzzle {
	constructor(size) {
		this.size = size;
		this.inProcess = false;
		this.isMenuPaused = false;
		this.moves = 0;
		this.time = {
			minutes: 0,
			seconds: 0,
		};
		this.tileSound = new Audio('./audio/slide-click.wav');
		this.soundOn = true;
	}

	init() {
		if (localStorage.getItem('currentPuzzleSize') !== this.size) {
			localStorage.removeItem('currentGameTime');
			localStorage.removeItem('currentGameMoves');
			localStorage.removeItem('tilesArr');
			localStorage.removeItem('gameIsPaused');
		}

		localStorage.setItem('currentPuzzleSize', this.size);

		if (localStorage.getItem('currentGameTime')) {
			localStorage.setItem('gameIsPaused', 'true');
		}

		let puzzleContainer = document.createElement('div');
		puzzleContainer.classList.add('puzzle__container');
		document.body.prepend(puzzleContainer);

		let puzzleTiles = document.createElement('div');
		puzzleTiles.classList.add('puzzle__tiles');
		puzzleContainer.prepend(puzzleTiles);

		this.puzzleWidth = puzzleTiles.offsetWidth;
		this.puzzleHeight = puzzleTiles.offsetHeight;

		this.puzzleTileWidth = this.puzzleWidth / this.size;
		this.puzzleTileHeight = this.puzzleHeight / this.size;

		if (localStorage.getItem('tilesArr')) {
			this.tiles = JSON.parse(localStorage.getItem('tilesArr'));

			for (let i = 0; i < this.size * this.size; i++) {
				let tile = document.createElement('button');
				tile.setAttribute('disabled', '');
				tile.classList.add('puzzle__tile');

				tile.textContent = this.tiles[i].value;

				tile.style.width = 100 / this.size + '%';
				tile.style.height = 100 / this.size + '%';

				puzzleTiles.append(tile);
				this.tiles[i].element = tile;

				tile.style.left = `${this.tiles[i].left * this.puzzleTileWidth}px`;
				tile.style.top = `${this.tiles[i].top * this.puzzleTileHeight}px`;

				tile.addEventListener('click', (event) => {
					let correctTile = this.tiles.find((item) => item.element === event.target);
					this.move(correctTile);
				});
			}
		} else {
			this.tiles = [];

			for (let i = 0; i < this.size * this.size; i++) {
				let tile = document.createElement('button');

				tile.setAttribute('disabled', '');
				tile.classList.add('puzzle__tile');

				if (i == this.size * this.size - 1) {
					tile.textContent = '';
				} else {
					tile.textContent = i + 1;
				}

				tile.style.width = 100 / this.size + '%';
				tile.style.height = 100 / this.size + '%';

				puzzleTiles.append(tile);

				let left = i % this.size;
				let top = Math.floor(i / this.size);
				let tileValue = i === this.size * this.size - 1 ? 0 : i + 1;

				this.tiles.push({
					left,
					top,
					value: tileValue,
					element: tile,
				});

				tile.style.left = `${left * this.puzzleTileWidth}px`;
				tile.style.top = `${top * this.puzzleTileHeight}px`;

				tile.addEventListener('click', (event) => {
					let correctTile = this.tiles.find((item) => item.element === event.target);
					this.move(correctTile);
				});
			}
		}

		this.tilesElements = this.tiles.map((item) => item.element);

		this.emptyTile = this.tiles.find((item) => item.value == 0);

		let emptyTile = this.emptyTile.element;
		emptyTile.classList.add('empty');

		let buttonContainer = document.createElement('div');
		buttonContainer.classList.add('puzzle__button-container');
		puzzleContainer.prepend(buttonContainer);

		this.newGameButton = document.createElement('div');
		this.newGameButton.classList.add('puzzle__new-game', 'puzzle__button');
		this.newGameButton.textContent = 'New Game';
		buttonContainer.append(this.newGameButton);

		this.newGameButton.addEventListener('click', () => {
			this.inProcess = true;
			localStorage.setItem('gameIsPaused', 'true');
			this.pauseButton.classList.remove('paused');
			this.pauseButton.innerHTML = `<svg height="13px" width="13px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			viewBox="0 0 47.607 47.607" style="enable-background:new 0 0 47.607 47.607;" xml:space="preserve">
	   <g>
		   <path fill="#ffffff" d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
			   l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
		   <path fill="#ffffff" d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
			   C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
	   </svg>
	   `;
			this.shuffle();
			this.pauseButton.removeAttribute('disabled');
			this.tilesElements.forEach((item) => item.removeAttribute('disabled'));

			this.stopStopwatch();
			this.time.seconds = 0;
			this.time.minutes = 0;
			this.updateTimeString();
			this.timeDisplay.innerHTML = this.timeString;

			this.moves = 0;
			localStorage.setItem('currentGameMoves', this.moves);
			this.movesDisplay.innerText = 'Moves: 0';
			this.launchStopwatch();
		});

		this.pauseButton = document.createElement('button');
		this.pauseButton.classList.add('puzzle__pause', 'puzzle__button');

		if (localStorage.getItem('gameIsPaused') === 'true') {
			this.pauseButton.innerHTML =
				'<svg width="17px" height="17px" fill="#ffffff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-c</title><path fill="#ffffff" d="M133,440a35.37,35.37,0,0,1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37,7.46-27.53,19.46-34.33a35.13,35.13,0,0,1,35.77.45L399.12,225.48a36,36,0,0,1,0,61L151.23,434.88A35.5,35.5,0,0,1,133,440Z"/></svg>';
			this.pauseButton.classList.add('paused');
		} else {
			this.pauseButton.setAttribute('disabled', '');
			this.pauseButton.innerHTML = `<svg height="13px" width="13px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 47.607 47.607" style="enable-background:new 0 0 47.607 47.607;" xml:space="preserve">
		   <g>
			   <path fill="#ffffff" d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
				   l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
			   <path fill="#ffffff" d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
				   C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
		   </svg>
		   `;
		}

		buttonContainer.append(this.pauseButton);

		let savedThis = this;

		this.pauseButton.addEventListener('click', function () {
			if (savedThis.inProcess) {
				this.innerHTML = `<svg width="17px" height="17px" fill="#ffffff" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-c</title><path fill="#ffffff" d="M133,440a35.37,35.37,0,0,1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37,7.46-27.53,19.46-34.33a35.13,35.13,0,0,1,35.77.45L399.12,225.48a36,36,0,0,1,0,61L151.23,434.88A35.5,35.5,0,0,1,133,440Z"/></svg>`;
				this.classList.add('paused');
				savedThis.stopStopwatch();
				savedThis.tilesElements.forEach((item) => item.setAttribute('disabled', ''));
				savedThis.inProcess = false;
			} else {
				this.innerHTML = `<svg height="13px" width="13px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 47.607 47.607" style="enable-background:new 0 0 47.607 47.607;" xml:space="preserve">
		   <g>
			   <path fill="#ffffff" d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
				   l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
			   <path fill="#ffffff" d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
				   C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
		   </svg>
		   `;
				this.classList.remove('paused');
				savedThis.launchStopwatch();
				savedThis.tilesElements.forEach((item) => item.removeAttribute('disabled'));
				savedThis.inProcess = true;
			}
		});

		this.timeDisplay = document.createElement('div');
		this.timeDisplay.classList.add('puzzle__time', 'puzzle__button');
		this.timeDisplay.textContent = '00 : 00';
		buttonContainer.append(this.timeDisplay);

		if (localStorage.getItem('currentGameTime')) {
			let gameTime = localStorage.getItem('currentGameTime').split(' : ');
			this.time.minutes = +gameTime[0];
			this.time.seconds = +gameTime[1];
			this.updateTimeString();
		}

		this.movesDisplay = document.createElement('div');
		this.movesDisplay.classList.add('puzzle__button', 'puzzle__moves');

		if (localStorage.getItem('currentGameMoves')) {
			this.movesDisplay.textContent = `Moves: ${localStorage.getItem('currentGameMoves')}`;
		} else {
			this.movesDisplay.textContent = 'Moves: 0';
		}

		buttonContainer.append(this.movesDisplay);

		let menu = document.createElement('div');
		menu.classList.add('puzzle__menu');
		buttonContainer.append(menu);

		let soundButton = document.createElement('div');
		soundButton.classList.add('puzzle__button');
		soundButton.textContent = 'Sound: ON';
		menu.append(soundButton);

		soundButton.addEventListener('click', () => {
			if (this.soundOn) {
				this.soundOn = !this.soundOn;
				soundButton.textContent = 'Sound: OFF';
			} else {
				this.soundOn = !this.soundOn;
				soundButton.textContent = 'Sound: ON';
			}
		});

		let resultsButton = document.createElement('div');
		resultsButton.classList.add('puzzle__button', 'puzzle__menu-results-button');
		resultsButton.textContent = 'Results';
		menu.append(resultsButton);

		this.resultsBody = document.createElement('div');
		this.resultsBody.classList.add('puzzle__menu-results');
		menu.append(this.resultsBody);

		let menuIcon = document.createElement('div');
		menuIcon.classList.add('puzzle__menu-icon', 'puzzle__button');
		menuIcon.append(document.createElement('span'));
		menuIcon.append(document.createElement('span'));
		menuIcon.append(document.createElement('span'));
		buttonContainer.append(menuIcon);

		menuIcon.addEventListener('click', () => {
			menu.classList.toggle('active');

			if (this.inProcess) {
				this.pauseButton.innerHTML = '⏵︎';
				this.pauseButton.classList.add('paused');
				this.stopStopwatch();
				this.inProcess = false;
				this.isMenuPaused = true;
			} else if (!this.inProcess && this.isMenuPaused) {
				this.pauseButton.innerHTML = '⏸︎';
				this.pauseButton.classList.remove('paused');
				this.launchStopwatch();
				this.inProcess = true;
				this.isMenuPaused = false;
			}
		});

		let disclaimer = document.createElement('div');
		disclaimer.classList.add('disclaimer');
		disclaimer.textContent = 'To start playing, click the "New game" button';
		document.body.prepend(disclaimer);

		this.updateResults();
	}

	updateTilePosFromArr(tile) {
		tile.element.style.left = `${tile.left * this.puzzleTileWidth}px`;
		tile.element.style.top = `${tile.top * this.puzzleTileHeight}px`;
	}

	updateArrFromTilePos() {
		let newTilesArr = [];

		for (let top = 0; top < this.size; top++) {
			for (let left = 0; left < this.size; left++) {
				let tile = this.tiles.find((item) => item.top === top && item.left === left);
				newTilesArr.push(tile);
			}
		}

		this.tiles = [...newTilesArr];
	}

	move(tile) {
		let leftDiff = Math.abs(tile.left - this.emptyTile.left);
		let topDiff = Math.abs(tile.top - this.emptyTile.top);

		if (leftDiff + topDiff > 1) return;

		let emptyTileLeft = this.emptyTile.left;
		let emptyTileTop = this.emptyTile.top;

		this.emptyTile.left = tile.left;
		this.emptyTile.top = tile.top;

		tile.left = emptyTileLeft;
		tile.top = emptyTileTop;

		this.updateTilePosFromArr(tile);
		this.updateTilePosFromArr(this.emptyTile);

		this.moves++;
		localStorage.setItem('currentGameMoves', this.moves);

		if (this.soundOn) this.tileSound.play();

		this.movesDisplay.innerHTML = `Moves: ${this.moves}`;

		this.updateArrFromTilePos();
		localStorage.setItem('tilesArr', JSON.stringify(this.tiles));

		this.checkIfSolved();
	}

	shuffle() {
		let tilePos = [];
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				tilePos.push([j, i]);
			}
		}

		let tilesCopy = [...this.tiles];

		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i] = tilesCopy.splice(Math.floor(Math.random() * tilesCopy.length), 1)[0];
			this.tiles[i].top = tilePos[i][1];
			this.tiles[i].left = tilePos[i][0];
			this.updateTilePosFromArr(this.tiles[i]);
		}

		let isSolvable;
		let solvabilityCounter = this.size;

		let tilesValues = [];
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				let tile = this.tiles.find((item) => item.left === j && item.top === i);
				let tileValue = tile.value;
				tilesValues.push(tileValue);
			}
		}

		for (let i = 0; i < this.size * this.size - 1; i++) {
			if (tilesValues[i] === 0) continue;

			for (let j = i + 1; j < tilesValues.length; j++) {
				if (tilesValues[j] === 0) continue;
				if (tilesValues[j] < tilesValues[i]) solvabilityCounter++;
			}
		}

		if (this.size % 2 === 0) {
			solvabilityCounter += this.size - this.emptyTile.top;
		}

		isSolvable = !!(solvabilityCounter % 2);

		if (!isSolvable) this.shuffle();

		localStorage.setItem('tilesArr', JSON.stringify(this.tiles));
	}

	checkIfSolved() {
		let tilesValues = [];
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				let tile = this.tiles.find((item) => item.left === j && item.top === i);
				let tileValue = tile.value;
				tilesValues.push(tileValue);
			}
		}

		let tilesValuesString = tilesValues.join(' ');

		let correctTileValuesString = '';
		for (let i = 1; i < this.size * this.size; i++) {
			correctTileValuesString += i + ' ';
		}
		correctTileValuesString += '0';

		if (tilesValuesString === correctTileValuesString) {
			let popupContainer = document.createElement('div');
			popupContainer.classList.add('puzzle__popup-container');
			let popup = document.createElement('div');
			popup.classList.add('puzzle__popup');
			popup.innerText = `Congrats! You solved the puzzle in  ${this.timeString} and ${this.moves} moves`;

			localStorage.setItem(
				`result ${this.timeString}-${this.moves}-${this.size}x${this.size}`,
				JSON.stringify({
					time: this.timeString,
					moves: this.moves,
					size: `${this.size}x${this.size}`,
				})
			);

			this.stopStopwatch();

			popupContainer.append(popup);
			document.body.append(popupContainer);

			this.updateResults();
			localStorage.removeItem('gameIsPaused');
			this.inProcess = false;

			setTimeout(() => {
				popupContainer.classList.add('disappear');
				popupContainer.remove();

				this.moves = 0;
				this.movesDisplay.innerText = 'Moves: 0';
				this.time.minutes = 0;
				this.time.seconds = 0;
				this.timeDisplay.innerText = '00 : 00';

				this.tilesElements.forEach((item) => item.setAttribute('disabled', ''));
				this.pauseButton.setAttribute('disabled', '');
			}, 3000);
		}
	}

	launchStopwatch() {
		this.intervalID = setInterval(() => {
			this.time.seconds++;
			if (this.time.seconds === 60) {
				this.time.minutes++;
				this.time.seconds = 0;
			}

			this.updateTimeString();
			localStorage.setItem('currentGameTime', this.timeString);
		}, 1000);
	}

	stopStopwatch() {
		clearInterval(this.intervalID);
	}

	updateTimeString() {
		let minutes = this.time.minutes.toString().length === 1 ? '0' + this.time.minutes : this.time.minutes;
		let seconds = this.time.seconds.toString().length === 1 ? '0' + this.time.seconds : this.time.seconds;

		this.timeString = `${minutes} : ${seconds}`;

		this.timeDisplay.textContent = this.timeString;
	}

	updateResults() {
		let resultsArr = [];

		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);

			if (key.includes('result')) {
				resultsArr.push(JSON.parse(localStorage.getItem(key)));
			}
		}

		if (resultsArr.length === 0) {
			this.resultsBody.innerHTML = 'No results yet';
			return;
		}

		resultsArr.sort((a, b) => {
			return a.moves - b.moves;
		});

		this.resultsBody.innerHTML = `<div class="puzzle__menu-result">
		<div class="size">Size</div>
		<div class="moves">Moves</div>
		<div class="time">Time</div>
	</div>`;

		for (let i = 0; i < resultsArr.length; i++) {
			if (i > 9) break;

			this.resultsBody.insertAdjacentHTML(
				'beforeend',
				`
			<div class="puzzle__menu-result">
				<div class="size">${resultsArr[i].size}</div>
				<div class="moves">${resultsArr[i].moves}</div>
				<div class="time">${resultsArr[i].time}</div>
			</div>
			`
			);
		}
	}
}

let currentGemPuzzle;

if (localStorage.getItem('currentPuzzleSize')) {
	let currentPuzzleSize = localStorage.getItem('currentPuzzleSize');
	let gemPuzzle = new GemPuzzle(currentPuzzleSize);
	gemPuzzle.init();

	currentGemPuzzle = gemPuzzle;
} else {
	let gemPuzzle = new GemPuzzle(4);
	gemPuzzle.init();

	currentGemPuzzle = gemPuzzle;
}

let puzzleContainer = document.querySelector('.puzzle__container');

let sizesContainer = document.createElement('div');
sizesContainer.classList.add('sizes__container');
puzzleContainer.after(sizesContainer);

for (let i = 3; i <= 8; i++) {
	let sizeButton = document.createElement('div');
	sizeButton.classList.add('sizes__button');
	sizeButton.textContent = `${i}x${i}`;
	sizesContainer.append(sizeButton);
}

let sizeButtons = document.querySelectorAll('.sizes__button');

let sizeButtonsArr = Array.from(sizeButtons);

sizeButtonsArr.find((item) => item.textContent[0] === localStorage.getItem('currentPuzzleSize')).classList.add('inactive');

for (let i = 0; i < sizeButtons.length; i++) {
	sizeButtons[i].addEventListener('click', (event) => {
		sizeButtons.forEach((item) => item.classList.remove('inactive'));
		event.target.classList.add('inactive');

		let puzzleContainer = document.querySelector('.puzzle__container');
		let disclaimer = document.querySelector('.disclaimer');
		puzzleContainer.remove();
		disclaimer.remove();
		currentGemPuzzle.stopStopwatch();

		let gemPuzzle = new GemPuzzle(i + 3);
		gemPuzzle.init();

		currentGemPuzzle = gemPuzzle;
	});
}
