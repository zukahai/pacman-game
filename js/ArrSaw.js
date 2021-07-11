class ArrSaw{
    constructor(game) {
        this.game = game;
        this.init();
    }

    init() {
        this.Asaw = [];
        this.Asaw[0] = new saw(this.game, Math.floor(Math.random() * 10000) % 3 + 1);
        this.Asaw[1] = new saw(this.game, Math.floor(Math.random() * 10000) % 3 + 1);
        if (Math.random() < 0.5)
            this.Asaw[1] = new saw(this.game, Math.floor(Math.random() * 10000) % 3 + 1);
    }

    draw() {
        this.Asaw[0].draw();
        this.Asaw[1].draw();
    }
}