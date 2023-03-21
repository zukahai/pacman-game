class ArrSaw {
    static speed = 1;
    constructor(game, Y) {
        this.game = game;
        this.Y = Y;
        this.init();
        ArrSaw.speed = 60 / Util.fps;
    }

    init() {
        this.Asaw = [];
        this.Asaw[0] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
        if (Math.random() < 0.6)
            this.Asaw[1] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
    }

    draw() {
        for (let i = 0; i < this.Asaw.length; i++) {
            this.Asaw[i].draw();
        }
    }

    down() {
        ArrSaw.speed = 60 / Util.fps;
        if (ArrSaw.speed > 0) {
            ArrSaw.speed *= (1 + Util.systemNumber * 1.5);
            for (let i = 0; i < this.Asaw.length; i++) {
                this.Asaw[i].y += ArrSaw.speed;
            }
        }
    }
}