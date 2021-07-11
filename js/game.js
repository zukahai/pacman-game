game_W = 0, game_H = 0;
XXX = 0
YYY = 0;
let angle = 60;
changeAngle = -5;
let start = 0;
circle_Im = new Image();
circle_Im.src = "images/circle.png";

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

        this.render();
        this.loop();

        this.listenMouse();
        this.listenTouch();
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
        })
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
        })

        document.addEventListener("touchstart", evt => {
            touchCheck = true;
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
        })

        document.addEventListener("touchend", evt => {    
        })

        this.context.restore();
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        this.render();
        angle += changeAngle;
        start++;
        if (angle >= 90 || angle <= 1){
            changeAngle = -changeAngle;
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
        this.drawBall(angle, start);
    }

    drawBall(angle, start) {
        this.context.beginPath();
        this.context.fillStyle = 'yellow';
        this.context.arc(game_W / 2, game_H / 2, 100, this.toRadius(start + angle / 2),this.toRadius(start + angle / 2 + 180), false);
        this.context.fill();
        this.context.closePath()

        this.context.beginPath();
        this.context.arc(game_W / 2, game_H / 2, 100, this.toRadius(start + angle / 2 + 180 - angle),this.toRadius(start + angle / 2 + 180 + 180 - angle), false);
        this.context.fill();
        this.context.closePath()
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#339999';
        this.context.fillRect(0 , 0, game_W, game_H);
        this.context.drawImage(circle_Im, XXX - 3 * this.getWidth(), YYY - 3 * this.getWidth(), 6 * this.getWidth(), 6 * this.getWidth())
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