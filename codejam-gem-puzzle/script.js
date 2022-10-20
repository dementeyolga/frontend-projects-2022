class GemPuzzle {
	constructor(size) {
		this.size = size;
	}

	init() {
		let tiles = [];
		for (let i = 1; i < this.size * this.size; i++) {
			tiles.push(i);
		}
		tiles.push('');

		tiles = tiles.map((item) => {
			let tile = document.createElement('div');
		});
	}
}

let puzzleContainer = document.createElement('div');
puzzleContainer.classList.add('puzzle__container');
document.body.prepend(puzzleContainer);

let gemPuzzle4 = new GemPuzzle(4);
gemPuzzle4.init();
