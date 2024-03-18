import { Card } from "./card.js";

const PI = Math.PI;
const T = PI / 9;
const MAXTHETA = T * 5;

export class Hand{
    constructor() {
        this.cardNum = 0;
        this.cards = [];
        this.showCard = 0;

        this.hand = {
            x: 0,
            y: 0,
            r: 0,
        };

        window.addEventListener("mousedown", this.mouseDown.bind(this));
        window.addEventListener("mousemove", this.mouseMove.bind(this));
    }
        
    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;
        this.hand.x = this.stageWidth / 2;
        this.hand.r = this.stageHeight / 2;
        this.hand.y = this.hand.r * Math.cos(MAXTHETA / 2) + this.stageHeight - 30;

        this.cardH = this.hand.r / 2;
        this.cardW = this.cardH / 3 * 2;

        for(let i=0; i<this.cardNum; i++) {
            this.cards[i].resize(w, h, this.cardW, this.cardH, this.hand);
        }

        if(this.showCard != 0) this.showCard.resize(w, h);
    }

    animate(ctx) {
        for(let i=0; i<this.cardNum; i++) {
            this.cards[i].animate(ctx);
        }
        if(this.showCard != 0) this.showCard.animate(ctx);
    }

    draw() {
        if(this.cardNum >= 9) return ;
        this.cards[this.cardNum] = new Card(this.cardW, this.cardH, this.hand, this.newCardNum, this.stageWidth, this.stageHeight);
        this.cardNum++;
        if(this.cardNum == 1){
            this.cards[0].locate(-PI);
            this.cards[0].target_theta(0);
        } else if(this.cardNum <= MAXTHETA / T) {
            let maxtheta = (this.cardNum-1) * T;
            for(let i=0; i<this.cards.length - 1; i++) {
                this.cards[i].target_theta(maxtheta / 2 - T * i);
            }
            this.cards[this.cards.length - 1].locate(-PI);
            this.cards[this.cards.length - 1].target_theta(-1 * maxtheta / 2);
        } else {
            for(let i=0; i<this.cards.length - 1; i++) {
                this.cards[i].target_theta(MAXTHETA * (0.5 - i / (this.cardNum - 1)));
            }
            this.cards[this.cards.length - 1].locate(-PI);
            this.cards[this.cards.length - 1].target_theta(-1 * MAXTHETA / 2);
        }
    }

    mouseDown(e) {
        for(let i=this.cards.length-1; i>=0; i--) {
            if(this.cards[i].mouseIn(e.x, e.y)) {
                this.cards.splice(i, 1);
                this.cardNum--;
                this.showCard = 0;
                break;
            }
        }
        if(this.cardNum == 1){
            this.cards[0].target_theta(0);
        } else if(this.cardNum <= MAXTHETA / T) {
            let maxtheta = (this.cardNum-1) * T;
            for(let i=0; i<this.cards.length; i++) {
                this.cards[i].target_theta(maxtheta / 2 - T * i);
            }
        } else {
            for(let i=0; i<this.cards.length; i++) {
                this.cards[i].target_theta(MAXTHETA * (0.5 - i / (this.cardNum - 1)));
            }
        }
    }

    mouseMove(e) {
        for(let i=this.cards.length-1; i>=0; i--) {
            if(this.cards[i].mouseIn(e.x, e.y)) {
                this.showCard = this.cards[i].showCard();
                break;
            } else {
                this.showCard = 0;
            }
        }
        for(let i=this.cards.length-1; i>=0; i--) {
            if(this.cards[i].mouseIn(e.x, e.y)) {
                this.cards[i].select();
            } else {
                this.cards[i].deSelect();
            }
        }
    }
}