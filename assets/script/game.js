var previousTime = 0,
    INTERVAL = 20,
    player,
    W = 600,
    GAME_W = 600,
    H = 600,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    SPACE = 32,
    BLOCK_SIZE = 40,
    FRAME_RATE = 4,
    // nbr_lvls = STAGES.length,
    actual_level = 0,
    output = null;

var SPRITES = new Image();
SPRITES.src = "./spritesheet.png";

var stageStr;

window.onload = function() {
    var canvas = document.getElementById("canvas"),
        c = canvas.getContext("2d");

    player = new Player();
    stage = new Stage(stageStr);

    player.setDefaultPos(stage.getStartCoords());

    setInterval(function() {
        var currentTime = new Date().getTime(),
            timeElapsed;

        if (previousTime == 0) {
            previousTime = currentTime;
        }
        timeElapsed = currentTime - previousTime;

        update(timeElapsed, currentTime);
        draw(canvas, timeElapsed, currentTime);
        previousTime = currentTime;
    }, INTERVAL);

    function update() {
        // if (key.isPressed(RIGHT) || buttons["right"]) {
        //     player.setDir("RIGHT", stage.stage);
        // }

        // if (key.isPressed(LEFT) || buttons["left"]) {
        //     player.setDir("LEFT", stage.stage);
        // }

        // if (key.isPressed(UP) || buttons["up"]) {
        //     player.setDir("UP", stage.stage);
        // }

        // if (key.isPressed(DOWN) || buttons["down"]) {
        //     player.setDir("DOWN", stage.stage);
        // }

        // if (key.isPressed(SPACE) || buttons["restart"]) {
        //     player.reset(stage);
        // }
        player.updatePosition();
        if (output == null) {
            output = player.interactWithStage(stage);
        }
        if (output != undefined && output != "end") {
            console.log(output);
            window.location.replace(output);
            output = "end";
        }
    }

    function draw(canvas, timeElapsed, currentTime) {
        var c = canvas.getContext("2d");
        clearCanvas(c);
        stage.draw(c, currentTime);
        player.draw(c, currentTime);
    }
};