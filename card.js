const PI = Math.PI;

export class Card{
    constructor() {
        this.centerX = 50;
        this.centerY = 100;
        this.theta;
        this.w;
        this.h;
    }

    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;

        this.w = this.stageHeight / 5;
        this.h = this.w * 1.5;
    }

    animate(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#000000"
        ctx.translate(50 + this.w / 2, 100 + this.h / 2);
        ctx.rotate(this.theta);
        ctx.fillRect(- this.w / 2, - this.h / 2, this.w, this.h);

        ctx.fillStyle = '#ff0000'
        ctx.fillRect(- this.w / 2, - this.h / 2, 5, 5);
        ctx.restore();
    }

    rotate(t) {
        this.theta = t;
    }
}