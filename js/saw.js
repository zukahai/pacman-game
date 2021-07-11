saw_Im = new Image();
saw_Im.src = "images/saw.png";

class saw{
    constructor (game, Y, type) {
        this.game = game;
        this.type = type;
        this.y = Y;
        this.init();
    }

    init() {
        switch (this.type) {
            case 1:
                this.x = game_W / 2 - 3.5 * this.game.getWidth();
                break;
            case 2:
                this.x = game_W / 2;
                break;
            case 3:
                this.x = game_W / 2 + 3.5 * this.game.getWidth();
                break;
        }
    }

    draw() {
        this.game.context.drawImage(saw_Im, this.x - 1.5 * this.game.getWidth(), this.y - 0.5 * this.game.getWidth(), 3 * this.game.getWidth(), 1 * this.game.getWidth());
    }
}