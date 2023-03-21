class Util {
    //FPS
    static fps = 0;
    static lastTime = 0;
    static calculateFPS(time) {
        Util.fps = Math.round(1000 / (time - Util.lastTime));
        Util.lastTime = time;
    }

    //system number
    static systemNumber = 0;
    static calSystemNumber(number) {
        Util.systemNumber = Math.sqrt(number) / 6;
    }


    //API
    static urlAPI = 'https://54a1-103-176-110-169.ap.ngrok.io/game-vku';
    static nameGame = 'pacman';

    static async findPlayerByPhoneNumberAndGameId(phoneNumber, game) {
        const url = Util.urlAPI + "/find-by-phone-and-name_game";
        const postData = {
            phone: phoneNumber,
            nameGame: game
        };
        return await axios.post(url, postData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                const errorMessage = error.response ? error.response.data.message : "Đã xảy ra lỗi khi gửi yêu cầu!";
                console.error(errorMessage);
                return Promise.reject(errorMessage);
            });
    }

    static async findPlayerByPhoneNumber(phoneNumber) {
        const url = Util.urlAPI + "/find-by-phone-and-name_game";
        const postData = {
            phone: phoneNumber
        };
        return await axios.post(url, postData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                const errorMessage = error.response ? error.response.data.message : "Đã xảy ra lỗi khi gửi yêu cầu!";
                console.error(errorMessage);
                return Promise.reject(errorMessage);
            });
    }

    static postPlayerScore(namePlayer, nameGame, school, phone, score) {
        if (!namePlayer || !nameGame || !school || !phone) {
            return Promise.reject("Vui lòng nhập đầy đủ thông tin!");
        }

        const postData = {
            namePlayer: namePlayer,
            nameGame: nameGame,
            score: score,
            school: school,
            phone: phone
        };

        return new Promise((resolve, reject) => {
            $.ajax({
                url: Util.urlAPI,
                type: "POST",
                data: JSON.stringify(postData),
                contentType: "application/json",
                success: function(data) {
                    console.log(data);
                    resolve(data); // trả về dữ liệu khi thành công
                },
                error: function(xhr, status, error) {
                    // Xử lý lỗi
                    const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "Đã xảy ra lỗi khi gửi yêu cầu!";
                    console.error(errorMessage);
                    reject(errorMessage); // trả về thông báo lỗi khi thất bại
                }
            });
        });
    }

    //Local Storage
    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    static removeItem(key) {
        localStorage.removeItem(key);
    }
    static clear() {
        localStorage.clear();
    }

    static getCurrentPlayer() {
        const player = localStorage.getItem('player-get-eggs');
        // console.log("player: ", player);
        return player;
    }

    static findPlayer(phonenumber) {
        if (players) {
            const player = players.find(player => player.phonenumber === phonenumber);
            if (player) {
                return player;
            }
        }
        return null;
    }

    static updatePlayers() {
        const players = localStorage.getItem('players');
        if (players) {
            let currentPlayer = localStorage.getCurrentPlayer();
            if (currentPlayer) {
                players.forEach(player => {
                    if (player.phonenumber === currentPlayer.phonenumber) {
                        player.score += 1;
                    }
                });
            }
            Util.setItem('players', players);
        }
    }

    static updateScore() {
        const playerCurrent = Util.getItem('player-get-eggs');
        if (playerCurrent) {
            playerCurrent.score += 1;
            Util.setItem('player-get-eggs', playerCurrent);
        }
    }
}