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
	}

	draw() {
		let index = Math.floor(Math.random() * this.cards.length);
		let cardObj = this.cards[index];
		let tempCard = this.cards[this.cards.length-1];
		this.cards[index] = tempCard;
		this.cards.pop();
		this.length = this.cards.length;
		return cardObj;
	}

	shuffle() {
		let index = this.length + 1;
		let temp;
		let randomIndex;

		while (index > 0) {
			randomIndex = Math.floor(Math.random() * index);
			index -= 1;
			temp = this.cards[index];
			this.cards[index] = this.cards[randomIndex];
			this.cards[randomIndex] = temp;
		}
	}

	split() {

	}
	
}

class Gameboard {

}