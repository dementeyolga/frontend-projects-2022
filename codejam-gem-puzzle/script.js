class GemPuzzle {
	constructor(size) {
		this.size = size;
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
			let tile = document.createElement('div');
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
				element: tile,
			});

			tile.style.left = `${left * this.puzzleTileWidth}px`;
			tile.style.top = `${top * this.puzzleTileHeight}px`;

			tile.addEventListener('click', () => {
				this.move(i);
			});
		}

		let emptyTile = this.tiles[this.tiles.length - 1].element;
		emptyTile.classList.add('empty');
		emptyTile.textContent = '';

		this.emptyTile = this.tiles[this.tiles.length - 1];

		this.newGameButton = document.createElement('div');
		this.newGameButton.classList.add('puzzle__new-game');
		this.newGameButton.textContent = 'New Game';
		puzzleContainer.prepend(this.newGameButton);

		console.log(this.tiles);

		let savedThis = this;

		this.newGameButton.addEventListener('click', function (elem) {
			savedThis.shuffle();
		});
	}

	updateTilePosFromArr(tile) {
		tile.element.style.left = `${tile.left * this.puzzleTileWidth}px`;
		tile.element.style.top = `${tile.top * this.puzzleTileHeight}px`;
	}

	move(i) {
		let tile = this.tiles[i];
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
	}

	shuffle() {
		let tilePos = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3], ,];

		for (let i = 0; i < this.tiles.length; i++) {
			let newPos = tilePos.splice(Math.floor(Math.random() * tilePos.length), 1)[0];
			console.log(Array.isArray(newPos));
			this.tiles[i].left = newPos[0];
			this.tiles[i].top = newPos[1];

			this.updateTilePosFromArr(this.tiles[i]);
		}
	}
}

let gemPuzzle4 = new GemPuzzle(4);
gemPuzzle4.init();
