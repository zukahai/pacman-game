let buttons_image = [];
buttons_image[0] = new Image();
buttons_image[0].src = "assets/images/buttons/1.png";
buttons_image[1] = new Image();
buttons_image[1].src = "assets/images/buttons/2.png";

class ButtonManager {
    constructor(game, size, player) {
        this.game = game;
        this.size = size;
        this.player = player;


        this.height = 0.5 * this.size;
        this.width = 2.5 * this.height;
        let padding = size;
        this.x = (game_W - this.width) / 2;
        this.y = game_H - padding;
        this.indexImage = (this.player.isNotGuest()) ? 0 : 1;
    }

    isClick(x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            console.log(this.player.getName());
            if (this.player.isNotGuest()) {
                Util.removeItem("player-pacman");
            }
            window.location.href = "./register/login.html";
        }
    }

    draw() {
        this.game.context.drawImage(buttons_image[this.indexImage], this.x, this.y, this.width, this.height);
    }
}