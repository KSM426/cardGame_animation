import { Hand } from "./hand.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        this.hand = new Hand();

        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        
        this.hand.resize(this.stageWidth, this.stageHeight);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.hand.animate(this.ctx);
    }

    keyDown(e) {
        if(e.keyCode == 68) {
            console.log("Draw a Card");
            this.hand.draw();
        }
    }
}

window.onload = () => {
    new App();
}