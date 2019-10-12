class Card {
 	constructor (suit, rank, score) {
 		this.suit = suit;
 		this.rank = rank;
 		this.score = score;
 	}
 }

class Deck {
	constructor (length = 52, cards = []) {
		let cardArray = cards;
		if (cardArray.length === 0) {
			let suit = ["hearts", "spades", "clubs", "diamonds"];
			let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace,"];
			for (let i = 0; i < 13; i++) {
				for (let j = 0; j < 4; j++) {
					cardArray.push(new Card(suit[j], rank[i], i+1));
				}
			}
		}
		this.length = length;
		this.cards = cardArray;
		this.shuffle();
	}

	draw() { //removes a card object from the cards attribute and returns it
		let cardObj = this.cards[this.cards.length - 1];
		this.cards.pop();
		this.length = this.cards.length;
		return cardObj;
	}

	shuffle() { //randomizes the cards attribute
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

	split(players = 2) { //returns an array of Deck objects based on the number of players, defaults to 2
		this.shuffle();
		let deckLength1, deckLength2;
		let playerCount = 0;
		let deckArray = [];
		let cardArray = [];
		if (players > 4 || players < 2) { //this is all assuming the length is 52
			alert("Error: The maximum player count is 4 and the minimum player count is 2.");
		} else {
			if (this.length % players === 0) {
				deckLength1 = this.length / players;
				if (players === 4) {
					while (playerCount < 4) {
						for(let i = playerCount*deckLength1; i < (playerCount * deckLength1) + deckLength1; i++) {
							cardArray.push(this.cards[i]);
						}
						deckArray.push(new Deck(deckLength1, cardArray));
						cardArray = [];
						playerCount++;
					}
				} else if (players === 2) {
					while (playerCount < 2) {
						for(let i = playerCount*deckLength1; i < (playerCount * deckLength1) + deckLength1; i++) {
							cardArray.push(this.cards[i]);
						}
						deckArray.push(new Deck(deckLength1, cardArray));
						cardArray = [];
						playerCount++;
					}
				} else {
					alert("Error: Player count is not within parameters.");
				}
			} else if ((this.length - 1) % players === 0){
				deckLength1 = (this.length - 1) / players;
				deckLength2 = deckLength1 + 1;
				if (players === 3) {
					while (playerCount < 3) {
						for(let i = playerCount*deckLength1; i < (playerCount*deckLength1) + deckLength1; i++) {
							cardArray.push(this.cards[i]);
						}
						if (playerCount === 2) {
							cardArray.push(this.cards[this.cards.length - 1]);
							deckArray.push(new Deck(deckLength2, cardArray));
						} else {
							deckArray.push(new Deck(deckLength1, cardArray));
						}
						cardArray = [];
						playerCount++;
					}
				} else {
					alert("Error: Player count is not within parameters.");
				}
			} else { //this is incase someone calls this method with a length other than 52
				// console.log("this.length: "+this.length+" players: "+players+" this.length - 1 % players: "+ this.length - 1  % players);
				alert("Error: You're using this method wrong.");
			}
			return deckArray;
		}

	}
	
}

class Gameboard {

}