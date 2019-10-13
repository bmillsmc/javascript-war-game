class Card {
 	constructor (suit, rank, score) {
 		this.suit = suit;
 		this.rank = rank;
 		this.score = score;
 	}
 }

class Deck {
	constructor (cards = [], playerNumber = undefined) {
		let cardArray = cards;
		if (cardArray.length === 0) {
			let suit = ["hearts", "spades", "clubs", "diamonds"];
			let rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
			for (let i = 0; i < 13; i++) {
				for (let j = 0; j < 4; j++) {
					cardArray.push(new Card(suit[j], rank[i], i+1));
				}
			}
		} else if (playerNumber !== undefined){
			this.playerNumber = playerNumber;
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
						deckArray.push(new Deck(cardArray, playerCount));
						cardArray = [];
						playerCount++;
					}
				} else if (players === 2) {
					while (playerCount < 2) {
						for(let i = playerCount*deckLength1; i < (playerCount * deckLength1) + deckLength1; i++) {
							cardArray.push(this.cards[i]);
						}
						deckArray.push(new Deck(cardArray, playerCount));
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
							deckArray.push(new Deck(cardArray, playerCount));
						} else {
							deckArray.push(new Deck(cardArray, playerCount));
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
		this.deckArray = deck1.split(playerCount);
		this.playerCount = this.deckArray.length;
		this.inPlayArray = [];
		this.warCount = 0;
		//this.playerNames = []; //take a prompt input and make an array of player names
	}

	playCards() {
		if(this.deckArray[0].cards.length === 0 || this.deckArray[1].cards.length === 0) {
			alert("Error: Game is finished");
		} else {
			for (let i = 0; i < this.playerCount; i++) {
				this.inPlayArray.push(this.deckArray[i].draw());
			}
			//if (deckArray.length > 2) {}
		
			// let finalCompareValue = -1;
			// for (let i = 0; i < inPlayArray.length; i++) {
			// 	if(finalCompareValue === -1) {
			// 		finalCompareValue = this.compareValue(this.inPlayArray[i], this.inPlayArray[i+1]); //this code is for more than two players
			// 	} else if (this.compareValue(this.inPlayArray[finalCompareValue]) < this.inPlayArray[i]) //but this wont work with how the compare value only returns an index, maybe make the compare value return an array with an index and the winning card object
			// }
			console.log("Player 1 played the "+this.inPlayArray[0].rank+" of "+this.inPlayArray[0].suit+" and Player 2 played the "+this.inPlayArray[1].rank+" of "+this.inPlayArray[1].suit+"."); //hard coded for now
			let winDeckIndex = this.compareValue(this.inPlayArray[0], this.inPlayArray[1]); //hard coded for now
			console.log("Player "+(this.deckArray[winDeckIndex].playerNumber + 1)+" wins this round."); //hard coded for now
			//if (this.inPlayArray[0].value !== this.inPlayArray[1]){
				this.returnToDeck(winDeckIndex);
			//}
		}

	}

	compareValue(card1, card2/*, card3 = undefined, card4 = undefined*/) { //takes in two (or more) card objects, and compares their value. retunrs 0, 1, 2, or 3 depending on the winner. if the values are equal, it calls war
		let warResult;
		if (card1.score === card2.score) {
			warResult = this.war();
			return warResult;
		} else if (card1.score > card2.score) {
			return 0
		} else {
			return 1;
		}
	}

	war() { // plays [warcount +1] cards into the inPlayArray facedown (just not console.logging / console log "3 cards played facedown") and flips one card faceup for each player which also goes into the inPlayArray. uses the comparevalue function on them and returns the result
		let warArray = [];
		console.log("WAR!");
		console.log("playercount: "+this.playerCount+" warCount: "+this.warCount+" deckArray: "+this.deckArray+" inPlayArray: "+this.inPlayArray+" "); //bug fixes
		for (let i = 0; i < this.playerCount; i++) {
			for (let j = 0; j < this.warCount + 1; j++) {
				warArray.push(this.deckArray[i].draw());
			}
			console.log("Player "+(i + 1)+" played "+(this.warCount + 1)+" cards facedown.");
		}
		for (let i = this.playerCount - 1; i >= 0; i--) {
			this.inPlayArray.shift(this.deckArray[i].draw());
		}
		for (let i = 0; i < this.inPlayArray.length; i++) { //for bug fixing, remove when done
			console.log(this.inPlayArray);
		}

		console.log(this.inPlayArray);
		for (let i = 0; i < this.playerCount; i++) {
			console.log("Player "+(i + 1)+ " played the "+this.inPlayArray[i].rank+" of "+this.inPlayArray[i].suit+"."); //maybe turn this console.log into a method like playMessage
		}
		this.waCount++;
		this.inPlayArray.concat(warArray);
		let warWinner = this.compareValue(this.inPlayArray[0], this.inPlayArray[1]);
		console.log("Player "+warWinner+" wins the war!");
		//if (this.inPlayArray[0].value !== this.inPlayArray[1]) {
			//this.returnToDeck(warWinner);
		//}
		return warWinner;

	}

	returnToDeck(winnerIndex) { //takes the winning players index in deckArray and returns the inPlayArray to the bottom of the winners deck in an arbitrary order (possibly turn the inPlayArray into a deck and use the shuffle method then just use the new decks card array to add to the players deck), and resets the inPlayArray
		let shuffleDeck = new Deck(this.inPlayArray);
		let shuffledCardArray = shuffleDeck.cards.concat(this.deckArray[winnerIndex].cards);
		this.deckArray[winnerIndex].cards = shuffledCardArray;
		this.deckArray[winnerIndex].length = this.deckArray[winnerIndex].cards.length;
		this.inPlayArray = [];
		this.checkWin();
	}

	checkWin() {
		for (let i = 0; i < this.playerCount; i++) {
			if(this.deckArray[i].cards.length === 52) {
				console.log("Player "+(i + 1)+" has collected the entire deck. Player "+(i + 1)+" wins!!");
			}
		}
	}

}

let newGameboard = new Gameboard();
console.log("To play War, pick who will be player 1 and player 2 and then type newGameboard.playCards()")
