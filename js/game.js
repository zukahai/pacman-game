game_W = 0, game_H = 0;
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
    }

    render() {
        if (game_W / document.documentElement.clientWidth != cs || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            
            game_W = this.canvas.width;
            game_H = this.canvas.height;
        }
    }

    draw() {
        this.clearScreen();
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0 , 0, game_W, game_H); 
    }

    getWidth() {
        var area = game_W * game_H;
        return Math.sqrt(area / 300);
    }
}

var g = new game();