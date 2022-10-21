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

		let tiles = [];
		for (let i = 1; i < this.size * this.size; i++) {
			tiles.push(i);
		}
		tiles.push('');

		tiles = tiles.map((item) => {
			let tile = document.createElement('div');
			tile.classList.add('puzzle__tile');
			tile.textContent = item;

			puzzleTiles.append(tile);
		});

		let puzzleTilesCollection = document.querySelectorAll('.puzzle__tile');
		this.puzzleTilesWidth = puzzleTiles.offsetWidth;
		this.puzzleTilesHeight = puzzleTiles.offsetHeight;

		for (let i = 0; i < puzzleTilesCollection.length; i++) {
			puzzleTilesCollection[i].style.left = (this.puzzleTilesWidth / this.size) * (i % this.size) + 'px';
			puzzleTilesCollection[i].style.top = (this.puzzleTilesHeight / this.size) * Math.floor(i / this.size) + 'px';
			puzzleTilesCollection[i].style.width = 100 / this.size + '%';
			puzzleTilesCollection[i].style.height = 100 / this.size + '%';
		}

		this.emptyTile = puzzleTilesCollection[puzzleTilesCollection.length - 1].classList.add('empty');
	}

	move(elem, direction) {
		if (direction === 'up') elem.style.top = elem.style.top.slice(-2, 0) - this.puzzleTilesHeight / this.size + 'px';
		if (direction === 'down') elem.style.top = elem.style.top.slice(-2, 0) + this.puzzleTilesHeight / this.size + 'px';
		if (direction === 'left') elem.style.left = elem.style.left.slice(-2, 0) - this.puzzleTilesWidth / this.size + 'px';
		if (direction === 'right') elem.style.left = elem.style.left.slice(-2, 0) + this.puzzleTilesWidth / this.size + 'px';
	}
}

let gemPuzzle4 = new GemPuzzle(4);
gemPuzzle4.init();

let puzzleTilesCollection = document.querySelectorAll('.puzzle__tile');
puzzleTilesCollection.forEach(tile);
gemPuzzle4.move(puzzleTilesCollection[0], 'up');
