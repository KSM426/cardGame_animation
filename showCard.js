export class showCard {
    constructor(hand, num, sw, sh) {
        this.hand = hand;
        this.num = num;

        this.stageWidth = sw;
        this.stageHeight = sh;
        this.h = this.stageHeight / 2;
        this.w = this.h / 3 * 2;

    }

    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;
        
        this.h = this.stageHeight / 2;
        this.w = this.h / 3 * 2;
    }

    animate(ctx) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillStyle = "#dddddd";
        ctx.fillRect(this.hand.x - this.w / 2, this.stageHeight / 3 - this.h / 2, this.w, this.h);
        ctx.restore();
    }
}