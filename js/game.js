game_W = 0, game_H = 0;
score = 0;
XXX = 0
YYY = 0;
xPacman = 0, yPacman = 0;
xBall = 0, yBall = 0;
let angle = 60;
changeAngle = -5;
let AnglePacman = 0;
let AngleBall = 0;
let k = 1;
circle_Im = new Image();
circle_Im.src = "images/circle.png";
ball_Im = new Image();
ball_Im.src = "images/ball.png";
N = 5;
die = false;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        AngleBall = Math.floor(Math.random() * 1000000) % 360;
        this.render();

        let currentPlayer = Player.getCurrentPlayer();
        this.player = new Player(currentPlayer);
        console.log(this.player);

        this.arr = [];
        for (let i = 0; i < N; i++)
            this.arr[i] = new ArrSaw(this, -i * 9 * this.getWidth());
        this.loop();

        this.listenMouse();
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {

        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            k *= -1;
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 7);
    }

    update() {
        if (die)
            return;
        this.render();
        angle += changeAngle;
        AnglePacman += 1 * k;
        if (angle >= 90 || angle <= 1) {
            changeAngle = -changeAngle;
        }
        xPacman = XXX + 2.9 * this.getWidth() * Math.cos(this.toRadius(AnglePacman));
        yPacman = YYY + 2.9 * this.getWidth() * Math.sin(this.toRadius(AnglePacman));
        xBall = XXX + 2.9 * this.getWidth() * Math.cos(this.toRadius(AngleBall));
        yBall = YYY + 2.9 * this.getWidth() * Math.sin(this.toRadius(AngleBall));

        if ((AnglePacman - AngleBall + 20 * k) % 360 == 0) {
            score += 10;
            AngleBall = this.createBall(AngleBall);
        }
        for (let i = 0; i < N; i++)
            this.arr[i].down();
        if (this.arr[0].Y > game_H) {
            for (let i = 0; i < N - 1; i++)
                this.arr[i] = this.arr[i + 1];
            this.arr[N - 1] = new ArrSaw(this, game_H - N * 9 * this.getWidth());
        }
        if (this.checkDie()) {
            die = true;
            Util.postPlayerScore(this.player.getName(), 'pacman', this.player.getSchool(), this.player.getPhonenumber(), score);
            Util.findPlayerByPhoneNumberAndGameId(this.player.getPhonenumber(), 'pacman').then((respone) => {
                Util.setItem("player-pacman", respone);
                console.log(respone);
                console.log(Util.getItem("player-pacman"));
            })
            alert("Số điểm của bạn là " + score + "\nĐiểm cao nhất của bạn là: " + (this.player.getScore() > score ? this.player.getScore() : score));
            // location.reload();
        }
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.height = document.documentElement.clientHeight;

            this.canvas.width = this.canvas.height / 1.5;
            if (document.documentElement.clientWidth <= this.canvas.height)
                this.canvas.width = document.documentElement.clientWidth;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            XXX = game_W / 2;
            YYY = game_H / 2 + this.getWidth();
        }
    }

    draw() {
        this.clearScreen();
        this.drawPacman(angle, AnglePacman + 90 * k);
        this.drawBall();
        this.drawScore();
        this.drawHighScore();
        for (let i = 0; i < N; i++)
            this.arr[i].draw();
    }

    drawBall() {
        this.context.drawImage(ball_Im, xBall - this.getWidth() / 2, yBall - this.getWidth() / 2, this.getWidth(), this.getWidth());
    }

    drawScore() {
        this.context.textAlign = "right";
        this.context.font = this.getWidth() + 'px Calibri';
        this.context.fillStyle = "red"
        this.context.fillText("Score: " + score + " | " + this.player.getScore(), XXX + 6 * this.getWidth(), this.getWidth());
    }

    drawHighScore() {
        this.context.textAlign = "left";
        this.context.font = this.getWidth() + 'px Calibri';
        this.context.fillStyle = "red"
        this.context.fillText(this.player.getName(), 0, this.getWidth());
    }

    drawPacman(angle, AnglePacman) {
        this.context.beginPath();
        this.context.fillStyle = 'yellow';
        this.context.arc(xPacman, yPacman, this.getWidth() / 1.5, this.toRadius(AnglePacman + angle / 2), this.toRadius(AnglePacman + angle / 2 + 180), false);
        this.context.fill();
        this.context.closePath()

        this.context.beginPath();
        this.context.arc(xPacman, yPacman, this.getWidth() / 1.5, this.toRadius(AnglePacman + angle / 2 + 180 - angle), this.toRadius(AnglePacman + angle / 2 + 180 + 180 - angle), false);
        this.context.fill();
        this.context.closePath()
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#339999';
        this.context.fillRect(0, 0, game_W, game_H);
        this.context.drawImage(circle_Im, XXX - 4 * this.getWidth(), YYY - 4 * this.getWidth(), 8 * this.getWidth(), 8 * this.getWidth());
    }

    checkDie() {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < 2; j++)
                if (this.checkVC(this.arr[i].Asaw[j]))
                    return true;
        }
        return false;
    }

    checkVC(a) {
        if (xPacman + this.getWidth() / 1.5 < a.x - 1.3 * this.getWidth() || xPacman - this.getWidth() / 1.5 > a.x + 1.3 * this.getWidth())
            return false;
        if (yPacman + this.getWidth() / 1.5 <= a.y + 0.2 * this.getWidth() && yPacman + this.getWidth() / 1.5 >= a.y - 0.2 * this.getWidth())
            return true;
        if (yPacman - this.getWidth() / 1.5 <= a.y + 0.2 * this.getWidth() && yPacman - this.getWidth() / 1.5 >= a.y - 0.2 * this.getWidth())
            return true;
        return false;
    }

    getWidth() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }

    toRadius(n) {
        return (n / 180) * Math.PI;
    }

    createBall(N) {
        let cs = (Math.random() < 0.5) ? 1 : -1;
        let N2 = N + cs * (90 + Math.floor(Math.random() * 1000000) % 180);
        N2 = (N2 + 360) % 360;
        console.log(N, ' ', N2);
        return N2;
    }
}

var g = new game();