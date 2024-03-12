import { Card } from "./card.js";

const PI = Math.PI;
const MAXTHETA = PI * 5 / 9;

export class Hand{
    constructor() {
        this.cardNum = 0;
        this.cards = [];
    }

    resize() {

    }

    animate(ctx) {
        for(let i=0; i<this.cardNum; i++) {
            this.cards[i].animate(ctx);
        }
    }

    draw() {
        this.cards[this.cardNum] = new Card();
        this.cardNum++;
        if(this.cardNum < 5) {
            for(let i=0; i<this.cardNum; i++) {
                this.cards[i].rotate(MAXTHETA / 2 - MAXTHETA / (this.cardNum-1) * i);
            }
        } else {
            for(let i=0; i<this.cardNum; i++) {
                console.log((MAXTHETA / 2 - MAXTHETA / (this.cardNum-1) * i) / PI * 180);
                this.cards[i].rotate(MAXTHETA / 2 - MAXTHETA / (this.cardNum-1) * i);
            }
        }
    }
}