class Player {
    constructor(currentPlayer) {
        this.player = {
            phone: null,
            score: 0,
            namePlayer: "Guest",
            school: "",
            isGuest: true
        }
        if (currentPlayer) {
            this.player = currentPlayer;
        }
        Util.setItem('player-pacman', this.player);
    }

    getPlayer() {
        return this.player;
    }

    isNotGuest() {
        return !this.player.isGuest;
    }

    isGuest() {
        return this.player.isGuest;
    }

    getScore() {
        return this.player.score;
    }

    getName() {
        return this.player.namePlayer;
    }

    getSchool() {
        return this.player.school;
    }

    getPhonenumber() {
        return this.player.phone;
    }

    static getCurrentPlayer() {
        return Util.getItem("player-pacman")
    }
}