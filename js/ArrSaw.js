class ArrSaw{
    constructor(game, Y) {
        this.game = game;
        this.Y = Y;
        this.init();
    }

    init() {
        this.Asaw = [];
        this.Asaw[0] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
        this.Asaw[1] = this.Asaw[0];
        if (Math.random() < 0.6)
            this.Asaw[1] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
    }

    draw() {
        this.Asaw[0].draw();
        this.Asaw[1].draw();
    }

    down() {
        this.Y += 0.9;
        this.Asaw[0].y = this.Y;
        this.Asaw[1].y = this.Y;
    }
}