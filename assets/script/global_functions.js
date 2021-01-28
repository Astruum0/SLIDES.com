var buttons = {}


function getFrameId(currentTime, fps, totalFrames, animation = true) {
    if (animation) {
        return (Math.floor((currentTime / 1000) * fps) % totalFrames);
    } else {
        return 0
    }
}

function clearCanvas(c) {
    c.beginPath()
    c.rect(0, 0, W, H)
    c.fillStyle = "black"
    c.fill()
}

function mouseClicked(canvas, stage, event) {
    const rect = canvas.getBoundingClientRect()
    event.preventDefault()
    x = event.clientX - rect.left
    y = event.clientY - rect.top
    if (event.button == 0) {
        mouse_clicked = true
        if (x >= 0 && x < GAME_W && y >= 0 && y < H) {
            stagex = ~~(x / BLOCK_SIZE)
            stagey = ~~(y / BLOCK_SIZE)
            stage.stage[stagey][stagex] = selectedBlock
            if (testing) {
                stageModifiedDuringTesting = true
            }
            validStage = false
            toggleSaveBtn()
        } else if (x >= GAME_W + MARGIN && y >= 0 && y < H - BLOCK_SIZE) {
            selectedBlock = ~~(y / BLOCK_SIZE)
            scrollValue = selectedBlock * 10
        }
    } else if (event.button == 2) {
        if (x >= 0 && x < GAME_W && y >= 0 && y < H) {
            stagex = ~~(x / BLOCK_SIZE)
            stagey = ~~(y / BLOCK_SIZE)
            stage.stage[stagey][stagex] = 0
            if (testing) {
                stageModifiedDuringTesting = true
            }
            validStage = false
            toggleSaveBtn()
        }
    } else if (event.button == 1) {
        if (x >= 0 && x < GAME_W && y >= 0 && y < H) {
            stagex = ~~(x / BLOCK_SIZE)
            stagey = ~~(y / BLOCK_SIZE)
            selectedBlock = stage.stage[stagey][stagex]
            scrollValue = selectedBlock * 10
        }
    }
}

function scroll(e) {
    if (e.deltaY < 0) {
        scrollValue -= scrollStep
    } else if (e.deltaY > 0) {
        scrollValue += scrollStep
    }
    if (scrollValue > 130) {
        scrollValue = 0
    } else if (scrollValue < 0) {
        scrollValue = 130
    }
    selectedBlock = ~~(scrollValue / 10)

}

function drawBorder(c) {
    for (var i = BLOCK_SIZE; i <= 600; i += BLOCK_SIZE) {
        c.beginPath()
        c.lineWidth = 1
        c.moveTo(i, 0)
        c.lineTo(i, 600)
        c.moveTo(0, i)
        c.lineTo(600, i)
        c.strokeStyle = "white"
        c.stroke()
    }
}

function drawToolbar(c) {
    for (var i = 0; i <= 13; i++) {
        switch (i) {
            case 0:
                c.drawImage(SPRITES, 9 * BLOCK_SIZE, 5 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 1:
                c.drawImage(SPRITES, 9 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 2:
                c.drawImage(SPRITES, 11 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 3:
                c.drawImage(SPRITES, 12 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 4:
                c.drawImage(SPRITES, 10 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 5:
                c.drawImage(SPRITES, (9) * BLOCK_SIZE, 4 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 6:
                c.drawImage(SPRITES, (0) * BLOCK_SIZE, 5 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 7:
                c.drawImage(SPRITES, (0) * BLOCK_SIZE, 2 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 8:
                c.drawImage(SPRITES, (0) * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 9:
                c.drawImage(SPRITES, (0) * BLOCK_SIZE, 4 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 10:
                c.drawImage(SPRITES, 13 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 11:
                c.drawImage(SPRITES, 16 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 12:
                c.drawImage(SPRITES, 17 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
            case 13:
                c.drawImage(SPRITES, 14 * BLOCK_SIZE, 3 * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, GAME_W + MARGIN, BLOCK_SIZE * i, BLOCK_SIZE, BLOCK_SIZE)
                break
        }
    }
    c.beginPath()
    c.lineWidth = 3
    c.moveTo(GAME_W, 0)
    c.lineTo(GAME_W, 600)
    c.strokeStyle = "white"
    c.stroke()

    c.strokeStyle = "#ff8000"
    c.lineWidth = 4
    c.strokeRect(GAME_W + MARGIN, selectedBlock * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
}

function buttonClicked(button) {
    buttons[button] = true
    setTimeout(function() {
        buttons[button] = false
    }, 20)
}

function toggleSaveBtn() {
    if (validStage && session != "false") {
        btn = document.getElementById("save_disable")
        if (btn) {
            btn.disabled = false
            btn.id = "save_enable"
        }
    } else {
        btn = document.getElementById("save_enable")
        if (btn) {
            btn.disabled = true
            btn.id = "save_disable"
        }
    }
}

function showControllers() {
    var panel = document.getElementsByClassName("arrows")[0]
    panel.classList.remove("hidden")
}

function hideControllers() {
    var panel = document.getElementsByClassName("arrows")[0]
    panel.classList.add("hidden")
}

function autoSave() {
    localStorage.setItem('auto_save_level', JSON.stringify(stage.stage))
}

function clearStage() {
    stage.stage = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}

function getProgress() {
    return parseInt($.ajax({
        url: "php/get_actual_progress.php",
        async: false
    }).responseText)
}

function togglePopup() {
    container = document.getElementsByClassName("container")[0]
    editing = !editing
    document.getElementById("popup").classList.toggle("active")
    container.classList.toggle("blur")
    document.getElementsByClassName("logobox")[0].classList.toggle("blur")

}

function saveLevel() {
    if (validStage) {
        var output
        if (document.getElementsByClassName("alert-submit").length) {
            $(document.getElementsByClassName("alert-submit")).remove()
        }
        var level_name = document.getElementById("input_name").value
        if (level_name.length <= 3) {
            msg = "Your level's name has to contain at least 4 characters !"
            class_name = "alert-danger"
        } else {
            $.ajax({
                    type: "POST",
                    url: "php/save_level.php",
                    async: false,
                    data: { level_name: level_name, level_composition: JSON.stringify(stage.stage), },
                })
                .done(function(data) {
                    console.log(data)
                    output = data
                })
        }
        if (output == "success") {
            msg = "Level uploaded with success !"
            class_name = "alert-success"
        } else if (output == "err-level_name") {
            msg = "You already have a level named '" + level_name + "' !"
            class_name = "alert-danger"
        } else if (output == "err-level_compo") {
            msg = "Oops, it seems like your level has already been done by someone else ! (Maybe it's you ?)"
            class_name = "alert-danger"
        }
        console.log(output)
        output_div = document.createElement("div")
        output_div.innerText = msg
        output_div.classList.add("alert")
        output_div.classList.add(class_name)
        output_div.classList.add("alert-submit")
        $(output_div).hide().appendTo(document.getElementById("popup")).fadeIn(500);
    }
}