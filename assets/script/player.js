function Player() {
    this.size = 40;

    this.x = 0;
    this.y = 0;
    this.x_def = this.x;
    this.x_def = this.y;

    this.vel = 10;
    this.direction = "none";

    this.color = "#1E90FF";

    this.draw = function(c, currentTime) {
        switch (this.direction) {
            case "none":
                c.drawImage(
                    SPRITES,
                    getFrameId(currentTime, 10, 20) * this.size,
                    0,
                    this.size,
                    this.size,
                    this.x,
                    this.y,
                    this.size,
                    this.size
                );
                break;
            case "UP":
                c.drawImage(
                    SPRITES,
                    (9 + getFrameId(currentTime, 4, 2)) * this.size,
                    1 * this.size,
                    this.size,
                    this.size + 20,
                    this.x,
                    this.y,
                    this.size,
                    this.size + 20
                );
                break;
            case "LEFT":
                c.drawImage(
                    SPRITES,
                    2 * getFrameId(currentTime, 4, 2) * this.size,
                    1 * this.size,
                    this.size + 20,
                    this.size,
                    this.x,
                    this.y,
                    this.size + 20,
                    this.size
                );
                break;
            case "DOWN":
                c.drawImage(
                    SPRITES,
                    (11 + getFrameId(currentTime, 4, 2)) * this.size,
                    1 * this.size,
                    this.size,
                    this.size + 20,
                    this.x,
                    this.y - 15,
                    this.size,
                    this.size + 20
                );
                break;
            case "RIGHT":
                c.drawImage(
                    SPRITES,
                    (4 + 2 * getFrameId(currentTime, 4, 2)) * this.size,
                    1 * this.size,
                    this.size + 20,
                    this.size,
                    this.x - 15,
                    this.y,
                    this.size + 20,
                    this.size
                );
                break;
        }
    };
    this.setDir = function(dir, stage) {
        if (this.canMove()) {
            if (
                dir == "UP" &&
                this.y > 0 &&
                ![1, 11].includes(stage[this.y / BLOCK_SIZE - 1][this.x / BLOCK_SIZE])
            ) {
                this.direction = dir;
            } else if (
                dir == "LEFT" &&
                this.x > 0 &&
                ![1, 12].includes(stage[this.y / BLOCK_SIZE][this.x / BLOCK_SIZE - 1])
            ) {
                this.direction = dir;
            } else if (
                dir == "DOWN" &&
                this.y < 14 * BLOCK_SIZE &&
                ![1, 11].includes(
                    BLOCK_SIZE && stage[this.y / BLOCK_SIZE + 1][this.x / BLOCK_SIZE]
                )
            ) {
                this.direction = dir;
            } else if (
                dir == "RIGHT" &&
                this.x < 14 * BLOCK_SIZE &&
                ![1, 12].includes(stage[this.y / BLOCK_SIZE][this.x / BLOCK_SIZE + 1])
            ) {
                this.direction = dir;
            }
        }
    };
    this.updatePosition = function() {
        switch (this.direction) {
            case "UP":
                this.y -= this.vel;
                break;
            case "LEFT":
                this.x -= this.vel;
                break;
            case "DOWN":
                this.y += this.vel;
                break;
            case "RIGHT":
                this.x += this.vel;
                break;
        }
    };
    this.canMove = function() {
        return this.direction == "none";
    };
    this.reset = function(stage) {
        stage.resetStage();
        this.x = this.x_def;
        this.y = this.y_def;
        this.direction = "none";
    };
    this.convertCoords = function(i, j) {
        return [i * this.size, j * this.size];
    };
    this.setDefaultPos = function(coords) {
        this.x_def = coords[0];
        this.y_def = coords[1];
        this.x = this.x_def;
        this.y = this.y_def;
    };
    this.interactWithStage = function(stage, test = false) {
        if (
            this.x < 0 ||
            this.x > GAME_W - this.size ||
            this.y < 0 ||
            this.y >= H
        ) {
            this.reset(stage);
        }
        for (var i = 0; i < stage.stage.length; i++) {
            row = stage.stage[i];
            for (var j = 0; j < row.length; j++) {
                block = row[j];
                coords = this.convertCoords(j, i);
                x = coords[0];
                y = coords[1];
                if ((block == 2 || block == 4) && x == this.x && y == this.y) {
                    this.direction = "none";
                }
                if (block == 3 && x == this.x && y == this.y) {
                    this.direction = "none";
                    if (test) {
                        stage.resetStage();
                        return true;
                    }
                    if (!stage.lastLevel()) {
                        stage.nextLevel();
                        this.setDefaultPos(stage.getStartCoords());
                    } else {
                        if (story_mode) {
                            return "choose_stage";
                        }
                    }
                }
                if (block == 5 && x == this.x && y == this.y) {
                    this.reset(stage);
                }
                if (block == 6 && x == this.x && y == this.y) {
                    if (
                        i > 0 &&
                        (stage.stage[i - 1][j] == 1 || stage.stage[i - 1][j] == 11) &&
                        x == this.x &&
                        y == this.y
                    ) {
                        this.reset(stage);
                    } else {
                        this.direction = "UP";
                    }
                }
                if (block == 7 && x == this.x && y == this.y) {
                    if (
                        i < 14 &&
                        (stage.stage[i + 1][j] == 1 || stage.stage[i + 1][j] == 11) &&
                        x == this.x &&
                        y == this.y
                    ) {
                        this.reset(stage);
                    } else {
                        this.direction = "DOWN";
                    }
                }
                if (block == 8 && x == this.x && y == this.y) {
                    if (
                        j > 0 &&
                        (stage.stage[i][j - 1] == 1 || stage.stage[i][j - 1] == 12) &&
                        x == this.x &&
                        y == this.y
                    ) {
                        this.reset(stage);
                    } else {
                        this.direction = "LEFT";
                    }
                }
                if (block == 9 && x == this.x && y == this.y) {
                    if (
                        j < 14 &&
                        (stage.stage[i][j + 1] == 1 || stage.stage[i][j + 1] == 12) &&
                        x == this.x &&
                        y == this.y
                    ) {
                        this.reset(stage);
                    } else {
                        this.direction = "RIGHT";
                    }
                }
                if (this.direction != "none") {
                    if (block == 10 && x == this.x && y == this.y) {
                        stage.switchArrow();
                    }
                    if ((block == 13 || block == 14) && x == this.x && y == this.y) {
                        stage.switchPanel();
                    }
                }

                if (
                    i > 0 &&
                    this.direction == "UP" &&
                    (stage.stage[i - 1][j] == 1 || stage.stage[i - 1][j] == 11) &&
                    x == this.x &&
                    y == this.y
                ) {
                    this.direction = "none";
                }
                if (
                    j > 0 &&
                    this.direction == "LEFT" &&
                    (stage.stage[i][j - 1] == 1 || stage.stage[i][j - 1] == 12) &&
                    x == this.x &&
                    y == this.y
                ) {
                    this.direction = "none";
                }
                if (
                    i < 14 &&
                    this.direction == "DOWN" &&
                    (stage.stage[i + 1][j] == 1 || stage.stage[i + 1][j] == 11) &&
                    x == this.x &&
                    y == this.y
                ) {
                    this.direction = "none";
                }
                if (
                    j < 14 &&
                    this.direction == "RIGHT" &&
                    (stage.stage[i][j + 1] == 1 || stage.stage[i][j + 1] == 12) &&
                    x == this.x &&
                    y == this.y
                ) {
                    this.direction = "none";
                }
            }
        }
    };
}