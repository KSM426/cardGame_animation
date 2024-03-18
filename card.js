import { showCard } from "./showCard.js";

const PI = Math.PI;

/*
카드 출력
카드 모션
문양
내기 & 뽑기
확대
*/

export class Card{
    constructor(w, h, hand, n, sw, sh) {
        this.w = w;
        this.h = h;
        this.hand = hand;

        this.num = n;
        this.stageWidth = sw;
        this.stageHeight = sh;
        this.shadowColor = 'rgba(0, 0, 0, 0.5)';
    }

    resize(sw, sh, w, h, hand) {
        this.stageWidth = sw;
        this.stageHeight = sh;
        this.w = w;
        this.h = h;
        this.hand = hand;
    }

    animate(ctx) {
        this.move();

        ctx.save();
        ctx.shadowColor = this.shadowColor;
        console.log(ctx.shadowColor);
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;

        ctx.fillStyle = `#dddddd`;
        ctx.translate(this.centerX, this.centerY);
        ctx.rotate(this.cardTheta);
        ctx.fillRect(-1 * this.w / 2, -1 * this.h / 2, this.w, this.h);
        ctx.restore();
    }

    target_theta(t) {
        this.targetTheta = t;
        this.target_cardTheta(this.targetTheta / 2);
    }

    target_cardTheta(t) {
        this.targetCardTheta = t;
    }

    locate(t) {
        this.theta = t;
        this.cardTheta = this.theta / 2;
        this.center(this.theta)
    }
    
    center(t) {
        this.centerX = this.hand.x + this.hand.r * Math.sin(t); 
        this.centerY = this.hand.y - this.hand.r * (t*t * 0.03 + Math.cos(t));
    }
    
    move() {
        if(this.targetTheta != undefined) this.theta += (this.targetTheta - this.theta) * 0.2;
        if(this.targetCardTheta != undefined) this.cardTheta += (this.targetCardTheta - this.cardTheta) * 0.2;
        this.center(this.theta);
    }

    mouseIn(ex, ey) {
        if((ex - this.centerX) ** 2 + (ey - this.centerY) ** 2 < (this.w / 2) ** 2) {
            return true;
        }
        return false;
    }
    showCard() {
        return new showCard(this.hand, this.num, this.stageWidth, this.stageHeight);
    }

    select() {
        this.shadowColor = 'rgba(0, 150, 0, 0.7)';
    }

    deSelect() {
        this.shadowColor = 'rgba(0, 0, 0, 0.5)';
    }
    
}