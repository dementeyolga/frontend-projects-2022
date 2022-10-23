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
	}

	init() {
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

		this.tiles = [];
		for (let i = 0; i < this.size * this.size; i++) {
			let tile = document.createElement('button');
			tile.setAttribute('disabled', '');
			tile.classList.add('puzzle__tile');
			tile.textContent = i + 1;
			tile.style.width = 100 / this.size + '%';
			tile.style.height = 100 / this.size + '%';

			puzzleTiles.append(tile);

			let left = i % this.size;
			let top = Math.floor(i / this.size);

			this.tiles.push({
				left,
				top,
				value: i + 1,
				element: tile,
			});

			tile.style.left = `${left * this.puzzleTileWidth}px`;
			tile.style.top = `${top * this.puzzleTileHeight}px`;

			tile.addEventListener('click', (event) => {
				let correctTile = this.tiles.find((item) => item.element === event.target);
				this.move(correctTile);
			});
		}

		this.tilesElements = this.tiles.map((item) => item.element);

		let emptyTile = this.tiles[this.tiles.length - 1].element;
		emptyTile.classList.add('empty');
		emptyTile.textContent = '';
		this.tiles[this.tiles.length - 1].value = 0;

		this.emptyTile = this.tiles[this.tiles.length - 1];

		let buttonContainer = document.createElement('div');
		buttonContainer.classList.add('puzzle__button-container');
		puzzleContainer.prepend(buttonContainer);

		this.newGameButton = document.createElement('div');
		this.newGameButton.classList.add('puzzle__new-game', 'puzzle__button');
		this.newGameButton.textContent = 'New Game';
		buttonContainer.append(this.newGameButton);

		this.pauseButton = document.createElement('button');
		this.pauseButton.classList.add('puzzle__pause', 'puzzle__button');
		this.pauseButton.setAttribute('disabled', '');
		this.pauseButton.textContent = 'Pause';
		buttonContainer.append(this.pauseButton);

		this.newGameButton.addEventListener('click', () => {
			this.inProcess = true;
			this.shuffle();
			this.pauseButton.removeAttribute('disabled');
			this.tilesElements.forEach((item) => item.removeAttribute('disabled'));

			clearInterval(this.intervalID);
			this.time.seconds = 0;
			this.time.minutes = 0;
			this.launchStopwatch();
		});

		let savedThis = this;

		this.pauseButton.addEventListener('click', function () {
			if (savedThis.inProcess) {
				this.textContent = 'Resume';
				this.classList.add('paused');
				clearInterval(savedThis.intervalID);
				savedThis.tilesElements.forEach((item) => item.setAttribute('disabled', ''));
				savedThis.inProcess = false;
			} else {
				this.textContent = 'Pause';
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

		let menu = document.createElement('div');
		menu.classList.add('puzzle__menu');
		buttonContainer.append(menu);

		let menuIcon = document.createElement('div');
		menuIcon.classList.add('puzzle__menu-icon', 'puzzle__button');
		menuIcon.append(document.createElement('span'));
		menuIcon.append(document.createElement('span'));
		menuIcon.append(document.createElement('span'));
		buttonContainer.append(menuIcon);

		menuIcon.addEventListener('click', () => {
			menu.classList.toggle('active');
			console.log(this.inProcess);

			if (this.inProcess) {
				this.pauseButton.textContent = 'Resume';
				this.pauseButton.classList.add('paused');
				clearInterval(this.intervalID);
				this.inProcess = false;
				this.isMenuPaused = true;
			} else if (!this.inProcess && this.isMenuPaused) {
				this.pauseButton.textContent = 'Pause';
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
	}

	updateTilePosFromArr(tile) {
		tile.element.style.left = `${tile.left * this.puzzleTileWidth}px`;
		tile.element.style.top = `${tile.top * this.puzzleTileHeight}px`;
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
		console.log(this.moves);

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
			this.tiles[i].top = tilePos[i][0];
			this.tiles[i].left = tilePos[i][1];
			this.updateTilePosFromArr(this.tiles[i]);
		}

		let isSolvable;
		let solvabilityCounter = this.size;

		for (let i = 0; i < this.size * this.size; i++) {
			if (this.tiles[i].value === 0) continue;

			for (let j = i + 1; j < this.tiles.length; j++) {
				if (this.tiles[j].value === 0) continue;
				if (this.tiles[j].value < this.tiles[i].value) solvabilityCounter++;
			}
		}

		if (this.size % 2 === 0) {
			solvabilityCounter += this.size - this.emptyTile.top;
		}

		isSolvable = solvabilityCounter % 2 !== 0;

		if (!isSolvable) this.shuffle();
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
		let correctTileValuesString = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 0';
		if (tilesValuesString === correctTileValuesString) {
			let popupContainer = document.createElement('div');
			popupContainer.classList.add('puzzle__popup-container');
			let popup = document.createElement('div');
			popup.classList.add('puzzle__popup');
			popup.innerText = `Congrats! You solved the puzzle in  ${this.timeString} and ${this.moves} moves`;
			results.push({
				time: this.timeString,
				moves: this.moves,
				size: `${this.size}x${this.size}`,
			});

			console.log(results);
			popupContainer.append(popup);
			document.body.append(popupContainer);

			setTimeout(() => {
				popupContainer.classList.add('disappear');
				popupContainer.remove();

				this.moves = 0;
				this.time.minutes = 0;
				this.time.seconds = 0;
				this.shuffle();

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

			let minutes = this.time.minutes.toString().length === 1 ? '0' + this.time.minutes : this.time.minutes;
			let seconds = this.time.seconds.toString().length === 1 ? '0' + this.time.seconds : this.time.seconds;

			this.timeString = `${minutes} : ${seconds}`;

			this.timeDisplay.textContent = this.timeString;
		}, 1000);
	}
}

const results = [];

let gemPuzzle4 = new GemPuzzle(4);
gemPuzzle4.init();
