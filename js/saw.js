saw_Im = new Image();
saw_Im.src = "images/saw.png";

class saw{
    constructor (game, type) {
        this.game = game;
        this.type = type;
        this.init();
    }

    init() {
        switch (this.type) {
            case 1:
                this.x = game_W / 2 - 4 * this.game.getWidth();
                break;
            case 2:
                this.x = game_W / 2;
                break;
            case 3:
                this.x = game_W / 2 + 4 * this.game.getWidth();
                break;
        }
        this.x = game_W / 2;
        this.y = game_H / 2;
    }

    draw() {
        this.game.context.drawImage(saw_Im, this.x - 1.5 * this.game.getWidth(), this.y - 0.5 * this.game.getWidth(), 3 * this.game.getWidth(), 1 * this.game.getWidth());
    }
}