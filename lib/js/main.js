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

	
}