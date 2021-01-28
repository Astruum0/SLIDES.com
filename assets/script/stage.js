function Stage(data) {
    this.actualStage = 0;
    this.nbrStages = data.length;
    this.stage = JSON.parse(data);

    this.panelSwitched = false;
    this.arrowRotations = 0;

    this.getStartCoords = function() {
        for (var i = 0; i < this.stage.length; i++) {
            row = this.stage[i];
            for (var j = 0; j < row.length; j++) {
                block = row[j];
                if (block === 2) {
                    return [j * BLOCK_SIZE, i * BLOCK_SIZE];
                }
            }
        }
        return [0, 0];
    };

    this.switchArrow = function() {
        this.arrowRotations = (this.arrowRotations + 1) % 4;
        for (var i = 0; i < this.stage.length; i++) {
            row = this.stage[i];
            for (var j = 0; j < row.length; j++) {
                block = row[j];
                switch (block) {
                    case 6:
                        this.stage[i][j] = 9;
                        break;
                    case 7:
                        this.stage[i][j] = 8;
                        break;
                    case 8:
                        this.stage[i][j] = 6;
                        break;
                    case 9:
                        this.stage[i][j] = 7;
                        break;
                }
            }
        }
    };
    this.switchPanel = function() {
        this.panelSwitched = !this.panelSwitched;
        for (var i = 0; i < this.stage.length; i++) {
            row = this.stage[i];
            for (var j = 0; j < row.length; j++) {
                block = row[j];
                switch (block) {
                    case 11:
                        this.stage[i][j] = 12;
                        break;
                    case 12:
                        this.stage[i][j] = 11;
                        break;
                    case 13:
                        this.stage[i][j] = 14;
                        break;
                    case 14:
                        this.stage[i][j] = 13;
                        break;
                }
            }
        }
    };

    this.resetStage = function() {
        if (this.panelSwitched) {
            this.switchPanel();
        }
        var iteration = 4 - this.arrowRotations;
        for (var i = 0; i < iteration; i++) {
            this.switchArrow();
        }
    };

    this.draw = function(c, currentTime, animation = true, grid = false) {
        for (var i = 0; i < this.stage.length; i++) {
            row = this.stage[i];
            for (var j = 0; j < row.length; j++) {
                block = row[j];
                if (grid) {
                    drawBorder(c);
                }
                switch (block) {
                    case 1:
                        c.drawImage(
                            SPRITES,
                            9 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 2:
                        c.drawImage(
                            SPRITES,
                            11 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 3:
                        c.drawImage(
                            SPRITES,
                            12 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 4:
                        c.drawImage(
                            SPRITES,
                            10 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 5:
                        c.drawImage(
                            SPRITES,
                            (9 + getFrameId(currentTime, 4, 4, animation)) * BLOCK_SIZE,
                            4 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 6:
                        c.drawImage(
                            SPRITES,
                            getFrameId(currentTime, 16, 8, animation) * BLOCK_SIZE,
                            5 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 7:
                        c.drawImage(
                            SPRITES,
                            getFrameId(currentTime, 16, 8, animation) * BLOCK_SIZE,
                            2 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 8:
                        c.drawImage(
                            SPRITES,
                            getFrameId(currentTime, 16, 8, animation) * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 9:
                        c.drawImage(
                            SPRITES,
                            getFrameId(currentTime, 16, 8, animation) * BLOCK_SIZE,
                            4 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 10:
                        c.drawImage(
                            SPRITES,
                            13 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 11:
                        c.drawImage(
                            SPRITES,
                            16 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 12:
                        c.drawImage(
                            SPRITES,
                            17 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 13:
                        c.drawImage(
                            SPRITES,
                            14 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                    case 14:
                        c.drawImage(
                            SPRITES,
                            15 * BLOCK_SIZE,
                            3 * BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE,
                            BLOCK_SIZE * j,
                            BLOCK_SIZE * i,
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                        break;
                }
            }
        }
    };

    this.isValid = function() {
        var start = 0;
        var finishLine = false;

        for (var i = 0; i < this.stage.length; i++) {
            for (var j = 0; j < this.stage[i].length; j++) {
                block = this.stage[i][j];
                if (block == 2) {
                    start++;
                } else if (block == 3) {
                    finishLine = true;
                }
            }
        }
        return start == 1 && finishLine;
    };
}

function drawMiniStage(c, stage) {
    for (var i = 0; i < stage.length; i++) {
        row = stage[i];
        for (var j = 0; j < row.length; j++) {
            block = row[j];
            switch (block) {
                case 1:
                    c.drawImage(
                        SPRITES,
                        9 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 2:
                    c.drawImage(
                        SPRITES,
                        11 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 3:
                    c.drawImage(
                        SPRITES,
                        12 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 4:
                    c.drawImage(
                        SPRITES,
                        10 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 5:
                    c.drawImage(
                        SPRITES,
                        9 * BLOCK_SIZE,
                        4 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 6:
                    c.drawImage(
                        SPRITES,
                        0,
                        5 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 7:
                    c.drawImage(
                        SPRITES,
                        0,
                        2 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 8:
                    c.drawImage(
                        SPRITES,
                        0,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 9:
                    c.drawImage(
                        SPRITES,
                        0,
                        4 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 10:
                    c.drawImage(
                        SPRITES,
                        13 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 11:
                    c.drawImage(
                        SPRITES,
                        16 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 12:
                    c.drawImage(
                        SPRITES,
                        17 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 13:
                    c.drawImage(
                        SPRITES,
                        14 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
                case 14:
                    c.drawImage(
                        SPRITES,
                        15 * BLOCK_SIZE,
                        3 * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE,
                        MINI_BLOCK_SIZE * j,
                        MINI_BLOCK_SIZE * i,
                        MINI_BLOCK_SIZE,
                        MINI_BLOCK_SIZE
                    );
                    break;
            }
        }
    }
}