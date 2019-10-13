class Card {
 	constructor (suit, rank, score) {
 		this.suit = suit;
 		this.rank = rank;
 		this.score = score;
 	}
 }

class Deck {
	constructor (cards = []) {
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
		this.length = cardArray.length;
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
						deckArray.push(new Deck(cardArray));
						cardArray = [];
						playerCount++;
					}
				} else if (players === 2) {
					while (playerCount < 2) {
						for(let i = playerCount*deckLength1; i < (playerCount * deckLength1) + deckLength1; i++) {
							cardArray.push(this.cards[i]);
						}
						deckArray.push(new Deck(cardArray));
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
							deckArray.push(new Deck(cardArray));
						} else {
							deckArray.push(new Deck(cardArray));
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
/* gameboard call when js loads. gameboard initialzies a deck obeject and splits it between two players
into the deckarray attribute. default to 2 players but maybe add functionality for 3 or 4 if you have time
inplayarray starts empty but is used during the playcards method which uses the draw method from deck to draw the top
cards of each deck and calls the comparevalue method to compare the cards to each other. the highest value card wins and calls the returntodeck method for the given deck. if the values are tied
then the war function is called and [warcount + 1] amount of cards are placed faced down. finally a last card is flipped face up and the values are compared again using the comparevalue method
this goes until there is a winner of the war and then the returntodeck method is called to the winners deck. play continues until one player has all the cards in their deck. this is checked
each time at the end of the returntodeck method. if the player whos deck the cards are returning to has 52 cards then the win method is called. this displays a message saying who won.
*/
class Gameboard {
	constructor (playerCount = 2) {
		let deck1 = new Deck();
		this.playerCount = playerCount;
		this.deckArray = deck1.split();
		this.inPlayArray = [];
		this.warCount = 0;
	}

	playCards() {
		
	}

	compareValue() {

	}

	war() {

	}

	win() {

	}

	returnToDeck() {

	}

}
