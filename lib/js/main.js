class Card {
 	constructor (suit, rank, score) {
 		this.suit = suit;
 		this.rank = rank;
 		this.score = score;
 	}
 }

class Deck {
	constructor () {
		let cardArray = [];
		let suit = ["hearts", "spades", "clubs", "diamonds"];
		let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace,"];
		for (let i = 0; i < 13; i++) {
			for (let j = 0; j < 4; j++) {
				cardArray.push(new Card(suit[j], rank[i], i+1));
			}
		}
		this.length = 52;
		this.cards = cardArray;
		this.shuffle();
	}

	draw() {
		let cardObj = this.cards[this.cards.length - 1];
		this.cards.pop();
		this.length = this.cards.length;
		return cardObj;
	}

	shuffle() {
		let index = this.length;
		let temp;
		let randomIndex;
		let shuffleCount = 20;
		while (shuffleCount > 0) {
			while (index > 0) {
				randomIndex = Math.floor(Math.random() * index);
				index -= 1;
				temp = this.cards[index];
				this.cards[index] = this.cards[randomIndex];
				this.cards[randomIndex] = temp;
			}
			index = this.length;
			shuffleCount--;

		}
	}

	split() {

	}
	
}

class Gameboard {

}