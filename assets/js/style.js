let count = 0;
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;

function checkwin(player) {

    // First Row
    let winFlag = true;

    for (let i = 1; i <= 3; i++) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // Second Row
    winFlag = true;

    for (let i = 4; i <= 6; i++) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // Third Row
    winFlag = true;

    for (let i = 7; i <= 9; i++) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // First column
    winFlag = true;

    for (let i = 1; i <= 7; i += 3) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // Second column
    winFlag = true;

    for (let i = 2; i <= 8; i += 3) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // Third column
    winFlag = true;

    for (let i = 3; i <= 9; i += 3) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // First diagonal
    winFlag = true;
    for (let i = 1; i <= 9; i += 4) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    // Second diagonal
    winFlag = true;

    for (let i = 3; i <= 7; i += 2) {
        let sym = document.getElementById(`t${i}`).innerHTML;
        if (sym != player) {
            winFlag = false;
            break;
        }
    }
    if (winFlag) {
        fire(player);
        return true;
    }

    return false;
}

function fire(player) {
    if (player === "X") {
        scoreX++;
        $("#scoreX").text(scoreX);
    } else {
        scoreO++;
        $("#scoreO").text(scoreO);
    }

    Swal.fire({
        title: `🎉 Player ${player} Wins!`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        background: "#1a1a1a",
        color: "#fff",
    });

    resetBoard();
}

function resetBoard() {
    count = 0;
    for (let i = 1; i <= 9; i++) {
        let boxcolor = document.getElementById(`t${i}`);
        boxcolor.innerHTML = "";
        boxcolor.classList.remove("x", "o");

    }
    $("#turnIndicator").text(`Current Turn: ${currentPlayer}`);
}

function checkDraw() {
    if (count === 9) {
        Swal.fire({
            title: "🤝 It's a Draw!",
            icon: "info",
            timer: 1200,
            showConfirmButton: false,
            background: "#1a1a1a",
            color: "#fff"
        });
        resetBoard();
    }
}

$(document).ready(function () {
    $(".tile").on("click", function (e) {
        let tile = this;

        if (tile.innerHTML != "") {
            Swal.fire({
                title: "⚠️ Invalid Move!",
                icon: "warning",
                timer: 1000,
                showConfirmButton: false,
                background: "#1a1a1a",
                color: "#fff",
            });
            return;
        } else {
            tile.innerHTML = currentPlayer;

            // add CSS class for X or O
            if (currentPlayer === "X") {
                tile.classList.add("x");
            } else {
                tile.classList.add("o");
            }

            count++;

        }

        if (count >= 5) {
            let win = checkwin(currentPlayer);

            if (win) {
                return;
            }

            if (count === 9) {
                checkDraw();
            }
        }

        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        $("#turnIndicator").text("Current Turn: " + currentPlayer);

    });

    $("#reset-btn").on("click", function () {
        resetBoard();
        Swal.fire({
            title: "Reset 🔄!",
            icon: "info",
            timer: 1200,
            showConfirmButton: false,
            background: "#1a1a1a",
            color: "#fff",
        });
    });

    $("#startPlayer").on("change", function () {
        currentPlayer = $(this).val();
        $("#turnIndicator").text("Current Turn: " + currentPlayer);
        resetBoard();
    });
});
