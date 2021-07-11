class ArrSaw{
    constructor(game, Y) {
        this.game = game;
        this.Y = Y;
        this.init();
    }

    init() {
        this.Asaw = [];
        this.Asaw[0] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
        this.Asaw[1] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
        if (Math.random() < 0.5)
            this.Asaw[1] = new saw(this.game, this.Y, Math.floor(Math.random() * 10000) % 3 + 1);
    }

    draw() {
        this.Asaw[0].draw();
        this.Asaw[1].draw();
    }

    down() {
        this.Asaw[0].down();
        this.Asaw[1].down();
    }
}