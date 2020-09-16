// console.log('This is my card game!');

class Card {
  constructor({value, suit}) {
    this.value = value;
    this.suit = suit;
  }

  get description() {
    const values = [null, null, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
    return `${values[this.value]} of ${this.suit}`;
  }
}

class Deck {
  constructor() {
    this.cards = [];

    const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts'];
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    for(const suit of suits) {
      for(const value of values) {
        this.cards.push(new Card({value: value, suit: suit}));
      }
    }
  }
}

class Player {
  constructor(options) {
    options = options || {};
    this.name = options.name;
    this.hand = [];
  }
}

class Game {
  constructor() {
    this.deck = new Deck();
    this.currentHand = [];
  }

  getPlayers() {
    // const player1 = prompt('Please enter your name Player 1: ');
    // const player2 = prompt('Please enter your name Player 2: ');

    const player1 = 'Oliver'
    const player2 = 'Sophie'

    this.player1 = new Player ({name: player1});
    this.player2 = new Player ({name: player2});
  }
// Shuffles the deck of cards
  shuffle() {
    const { cards } = this.deck;
    let currentIndex = cards.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
    return this;
  }

    deal() {
      this.player1.hand = this.deck.cards.filter((card, index) => index % 2 === 0);
      this.player2.hand = this.deck.cards.filter((card, index) => index % 2 !== 0);

      // this.compare(player1Card, player2Card);
    }

    compare(player1Card, player2Card) {
      if(player1Card.value > player2Card.value) {
        this.player1.hand = [...this.player1.hand, ...this.currentHand];
        this.currentHand = [];
      } else if (player1Card.value < player2Card.value) {
        this.player2.hand = [...this.player2.hand, ...this.currentHand];
        // this.player2.hand = this.player2.hand.concat(this.currentHand);
        this.currentHand = [];
      } else if (player1Card.value === player2Card.value) {
        alert("It's WAR!");
      }

      const faceDownCards = [...this.player1.hand.splice(0, 3), ...this.player2.hand.splice(0, 3)];

      if(faceDownCards.length === 6) {
        this.currentHand = [...this.currentHand, ...faceDownCards];
      }
    }

    play() {
      this.getPlayers();
      this.shuffle();
      this.deal();



      let i = 0;

      while(this.player1.hand.length > 0 && this.player2.hand.length > 0) {

        if(i > 5000) {
          return;
        }
        i++;




        // const response = prompt('Press q to quit. Press any key to play: ');
        // if(response.toLowerCase() === 'q') {
        //   return;
        // }

        this.draw();
      }

      if(this.player1.hand.length > 0) {
        console.log(`${this.player1.name} won!`);
      } else if(this.player2.hand.length > 0) {
        console.log(`${this.player2.name} won!`);
      }
    }

    draw() {
      let player1Card = this.player1.hand.shift();
      let player2Card = this.player2.hand.shift();

      console.log(`${this.player1.name} drew ${player1Card.description}`);
      console.log(`${this.player2.name} drew ${player2Card.description}`);

      this.currentHand = [...this.currentHand, player1Card, player2Card];

      this.compare(player1Card, player2Card);
    }
}
//
const game = new Game();
game.play();
