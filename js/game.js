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
        this.arr = new ArrSaw(this);
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
        this.render();
        angle += changeAngle;
        AnglePacman += 1 * k;
        if (angle >= 90 || angle <= 1){
            changeAngle = -changeAngle;
        }
        xPacman = XXX + 2.9 * this.getWidth() * Math.cos(this.toRadius(AnglePacman));
        yPacman = YYY + 2.9 * this.getWidth() * Math.sin(this.toRadius(AnglePacman));
        xBall = XXX + 2.9 * this.getWidth() * Math.cos(this.toRadius(AngleBall));
        yBall = YYY + 2.9 * this.getWidth() * Math.sin(this.toRadius(AngleBall));

        if ((AnglePacman - AngleBall + 20 * k) % 360 == 0) {
            score += 10;
            AngleBall = Math.floor(Math.random() * 1000000) % 360;
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
        this.arr.draw();
    }

    drawBall() {
        this.context.drawImage(ball_Im, xBall - this.getWidth() / 2, yBall - this.getWidth() / 2, this.getWidth(), this.getWidth());
    }

    drawScore() {
        this.context.font = this.getWidth() + 'px Calibri';
        this.context.fillStyle = "red"
        this.context.fillText("Score: " + score, this.getWidth(), this.getWidth());
    }

    drawPacman(angle, AnglePacman) {
        this.context.beginPath();
        this.context.fillStyle = 'yellow';
        this.context.arc(xPacman, yPacman, this.getWidth() / 1.5, this.toRadius(AnglePacman + angle / 2),this.toRadius(AnglePacman + angle / 2 + 180), false);
        this.context.fill();
        this.context.closePath()

        this.context.beginPath();
        this.context.arc(xPacman, yPacman, this.getWidth() / 1.5, this.toRadius(AnglePacman + angle / 2 + 180 - angle),this.toRadius(AnglePacman + angle / 2 + 180 + 180 - angle), false);
        this.context.fill();
        this.context.closePath()
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#339999';
        this.context.fillRect(0 , 0, game_W, game_H);
        this.context.drawImage(circle_Im, XXX - 4 * this.getWidth(), YYY - 4 * this.getWidth(), 8 * this.getWidth(), 8 * this.getWidth());
    }

    getWidth() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }

    toRadius(n) {
        return (n / 180) * Math.PI;
    }
}

var g = new game();