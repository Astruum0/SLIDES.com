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
  story_mode = true,
  // nbr_lvls = STAGES.length,
  actual_level = 0,
  level_id,
  output = null;

var SPRITES = new Image();
SPRITES.src = "./spritesheet.png";

var stage;

function start() {
  var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");

  player = new Player();
  stage = new Stage(stage);

  player.setDefaultPos(stage.getStartCoords());

  setInterval(function () {
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
    if (buttons["right"]) {
      player.setDir("RIGHT", stage.stage);
    }
    // if (key.isPressed(RIGHT) || buttons["right"]) {
    //     player.setDir("RIGHT", stage.stage);
    // }

    if (buttons["left"]) {
      player.setDir("LEFT", stage.stage);
    }
    // if (key.isPressed(LEFT) || buttons["left"]) {
    //     player.setDir("LEFT", stage.stage);
    // }

    if (buttons["up"]) {
      player.setDir("UP", stage.stage);
    }
    // if (key.isPressed(UP) || buttons["up"]) {
    //     player.setDir("UP", stage.stage);
    // }

    if (buttons["down"]) {
      player.setDir("DOWN", stage.stage);
    }
    // if (key.isPressed(DOWN) || buttons["down"]) {
    //     player.setDir("DOWN", stage.stage);
    // }

    if (buttons["restart"]) {
      player.reset(stage);
    }
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
}

var buttons = {};

function getFrameId(currentTime, fps, totalFrames, animation = true) {
  if (animation) {
    return Math.floor((currentTime / 1000) * fps) % totalFrames;
  } else {
    return 0;
  }
}

function clearCanvas(c) {
  c.beginPath();
  c.rect(0, 0, W, H);
  c.fillStyle = "black";
  c.fill();
}

function Stage(data) {
  this.actualStage = 0;
  // this.nbrStages = data.length;
  // this.stage = JSON.parse(data);
  this.stage = data;

  this.panelSwitched = false;
  this.arrowRotations = 0;

  this.getStartCoords = function () {
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

  this.switchArrow = function () {
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
  this.switchPanel = function () {
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

  this.resetStage = function () {
    if (this.panelSwitched) {
      this.switchPanel();
    }
    var iteration = 4 - this.arrowRotations;
    for (var i = 0; i < iteration; i++) {
      this.switchArrow();
    }
  };

  this.draw = function (c, currentTime, animation = true, grid = false) {
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

  this.isValid = function () {
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

function Player() {
  this.size = 40;

  this.x = 0;
  this.y = 0;
  this.x_def = this.x;
  this.x_def = this.y;

  this.vel = 10;
  this.direction = "none";

  this.color = "#1E90FF";

  this.draw = function (c, currentTime) {
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
  this.setDir = function (dir, stage) {
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
  this.updatePosition = function () {
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
  this.canMove = function () {
    return this.direction == "none";
  };
  this.reset = function (stage) {
    stage.resetStage();
    this.x = this.x_def;
    this.y = this.y_def;
    this.direction = "none";
  };
  this.convertCoords = function (i, j) {
    return [i * this.size, j * this.size];
  };
  this.setDefaultPos = function (coords) {
    this.x_def = coords[0];
    this.y_def = coords[1];
    this.x = this.x_def;
    this.y = this.y_def;
  };
  this.interactWithStage = function (stage, test = false) {
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

          return level_id + 1;
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

function buttonClicked(button) {
  buttons[button] = true;
  setTimeout(function () {
    buttons[button] = false;
  }, 20);
}
