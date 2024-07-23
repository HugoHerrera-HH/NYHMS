var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
var computer = {};
var player = {};
var winDetails = { 
    winner: null,
    cellCoords_1: "",
    cellCoords_2: "",
    cellCoords_3: "",
    setDefault: function(){
        this.winner = null;
        this.cellCoords_1 = "";
        this.cellCoords_2 = "";
        this.cellCoords_3 = "";
    }
};

$(function() {
    $("#playModal").modal({ backdrop: "static", keyboard: false });
    
    $("body").on("click", ".btn-marker-select", function() {
        var marker = $(this).data("marker");
        if(marker === 'O'){
            displayThinking();
            setTimeout(function() {
                startGame(marker);
            }, 1912);
        } else
            startGame(marker);
    });
    
    $(".square").click(function() {
        if(!$('.loader').is(':visible')){
            if(winDetails.winner == null && player.turn){
                var playCoord_X = parseInt($(this).data('x-coord'));
                var playCoord_Y = parseInt($(this).data('y-coord'));
                if(board[playCoord_Y][playCoord_X] === ""){
                    board[playCoord_Y][playCoord_X] = player.marker;
                    $(this).append('<div class="text-center">' + player.marker + "</div>");
                    evaluate();
                    if(winDetails.winner != null)
                        presentWin("player");
                    if(isDraw())
                        presentDraw();
                    if(winDetails.winner == null & !isDraw()) {
                        setTimeout(function() {
                            displayThinking();
                        }, 150);
                        setTimeout(function() {
                            player.turn = false;
                            computer.turn = true;
                            computer.move();
                        }, 1912);
                    }
                }
            }
        }
    });
    
    $("body").on("click", ".modal-close", function() {
        $("#resetContainer").toggleClass("hidden");
    });
    
    $("body").on("click", "#btn_Reset", function() {
        $("#resetContainer").toggleClass("hidden");
        reset();
    });
});

function hideThinker() {
    $(".loader").addClass("hidden");
}

function displayThinking() {
    $(".loader").removeClass("hidden");
}

function startGame(marker) {
    player = {
        turn: marker === "X",
        marker: marker
    };
    computer = {
        turn: marker === "O",
        marker: marker === "X" ? "O" : "X",
        move: function() {
            var playCoords = getNextMove().split(", ");
            var x = playCoords[0];
            var y = playCoords[1];
            board[y][x] = this.marker;
            $(".loader").fadeOut("slow", hideThinker());
            $('.square[data-x-coord="' + x + '"][data-y-coord="' + y + '"]'
            ).append('<div class="text-center">' + this.marker + "</div>");
            this.turn = false;
            player.turn = true;
            evaluate();
            if(winDetails.winner != null)
                presentWin("machine");
            if(isDraw())
                presentDraw();
        }
    };
    if (!player.turn) {
        computer.move();
    }
}

function getNextMove() {
    var playCoords = boardIsEmpty()
        ? Math.floor(Math.random() * board.length) +
          ", " +
          Math.floor(Math.random() * board.length)
        : checkRowsForWinPlay();
    return playCoords;
}

function boardIsEmpty() {
    return (
        [].concat.apply([], board).filter(function(s) {
            return s !== "";
        }).length === 0
    );
}

function checkRowsForWinPlay() {
    var playCoords = "";
    var winRows = board.filter(function(r) {
        return (
            (r[0] !== "" && r[0] !== player.marker && r[0] === r[1] && r[2] === "") ||
            (r[0] !== "" && r[0] !== player.marker && r[0] === r[2] && r[1] === "") ||
            (r[1] !== "" && r[1] !== player.marker && r[1] === r[2] && r[0] === "")
        );
    });
    if (winRows.length === 0) return checkColsForWinPlay();
    playCoords =
        winRows[0].indexOf("").toString() + ", " + board.indexOf(winRows[0]);
    return playCoords;
}

function checkColsForWinPlay() {
    var playCoords = "";
    var cols = getColumns()
    var winCols = cols.filter(function(c) {
       return (
           (c[0] !== "" && c[0] !== player.marker && c[0] === c[1] && c[2] === "") ||
           (c[0] !== "" && c[0] !== player.marker && c[0] === c[2] && c[1] === "") ||
           (c[1] !== "" && c[1] !== player.marker && c[1] === c[2] && c[0] === "")
       );
    });
    if (winCols.length === 0) return checkDiagsForWinPlay();
    playCoords = cols.indexOf(winCols[0]) + ", " + winCols[0].indexOf("");
    return playCoords;
}

function checkDiagsForWinPlay() {
    var playCoords = "";
    var flatBoard = getFlattenedBoard();
    var ulDiag = [];
    var llDiag = [];
    for(var i = 0; i < flatBoard.length; i++){
        if(i % 4 === 0){
            ulDiag.push(flatBoard[i]);
        }
    }
    if(ulDiag.indexOf(player.marker) > -1 || ulDiag.filter(function(s){return s !== '' && s !== player.marker;}).join('').length !== 2){
        flatBoard.shift();
        flatBoard.shift();
        flatBoard.pop();
        flatBoard.pop();
        for(var i = 0; i < flatBoard.length; i++){
            if(i % 2 === 0){
                llDiag.push(flatBoard[i]);
            }
        }
        if(llDiag.indexOf(player.marker) === -1 && llDiag.filter(function(s){return s !== "" && s !== player.marker;}).join('').length === 2){
            playCoords = getBlankDiagCoords(llDiag, "ll");
        }
    } else{
        playCoords = getBlankDiagCoords(ulDiag, "ul");
    }
    if(playCoords === "") return checkForDefensive();
    return playCoords;
}

function getBlankDiagCoords(diag, dir){
    var playCoords = "";
    var blankIndex = diag.indexOf("");
    switch(blankIndex){
        case 0:
            playCoords = dir === "ul" ? "0, 0" : "2, 0";
            break;
        case 1:
            playCoords = "1, 1";
            break;
        case 2:
            playCoords = dir === "ul" ? "2, 2" : "0, 2";
            break;
        default:
            break;
    }
    return playCoords;
}

function checkForDefensive(){
    var playCoords = "";
    var riskRows = board.filter(function(r) {
        return (
            (r[0] === player.marker && r[0] === r[1] && r[2] === "") ||
            (r[0] === player.marker && r[0] === r[2] && r[1] === "") ||
            (r[1] === player.marker && r[1] === r[2] && r[0] === "")
        );
    });
    if(riskRows.length === 0){
        var cols = getColumns();
        var riskCols = cols.filter(function(c) {
           return (
               (c[0] === player.marker && c[0] === c[1] && c[2] === "") ||
               (c[0] === player.marker && c[0] === c[2] && c[1] === "") ||
               (c[1] === player.marker && c[1] === c[2] && c[0] === "")
           );
        });
        if(riskCols.length === 0){
            var playCoords = "";
            var flatBoard = getFlattenedBoard();
            var ulDiag = [];
            var llDiag = [];
            for(var i = 0; i < flatBoard.length; i++){
                if(i % 4 === 0){
                    ulDiag.push(flatBoard[i]);
                }
            }
            if(ulDiag.indexOf(computer.marker) > -1 || ulDiag.filter(function(s){return s === player.marker;}).join('').length !== 2){
                flatBoard.shift();
                flatBoard.shift();
                flatBoard.pop();
                flatBoard.pop();
                for(var i = 0; i < flatBoard.length; i++){
                    if(i % 2 === 0){
                        llDiag.push(flatBoard[i]);
                    }
                }
                if(llDiag.indexOf("") > -1 && llDiag.filter(function(s){return s == player.marker;}).join('').length === 2){
                    playCoords = getBlankDiagCoords(llDiag, "ll");
                }
            } else{
                playCoords = getBlankDiagCoords(ulDiag, "ul");
            }
        } else {
            playCoords = cols.indexOf(riskCols[0]) + ", " + riskCols[0].indexOf("");
        }
    } else {
        playCoords = riskRows[0].indexOf("") + ", " + board.indexOf(riskRows[0]);
    }
    if(playCoords === "") return checkForClearDrive();
    return playCoords;
}

function checkForClearDrive(){
    var playCoords = "";
    var buildRows = board.filter(function(r){
        return r.indexOf(player.marker) === -1 && r.indexOf(computer.marker) > -1;
    });
    if(buildRows.length > 0)
        playCoords = buildRows[0].indexOf("") +", " + board.indexOf(buildRows[0]);
    else {
        var cols = getColumns();
        var buildCols = cols.filter(function(c){
            return c.indexOf(player.marker) === -1 && c.indexOf(computer.marker) > -1;
        });
        if(buildCols.length > 0)
            playCoords = cols.indexOf(buildCols[0]) + ", " + buildCols[0].indexOf("");
        else {
            var flatBoard = getFlattenedBoard();
            var ulDiag = [];
            var llDiag = [];
            for(var i = 0; i < flatBoard.length; i++){
                if(i % 4 === 0){
                    ulDiag.push(flatBoard[i]);
                }
            }
            if(ulDiag.indexOf(player.marker) !== -1 || ulDiag.indexOf(computer.marker) === -1){
                flatBoard.shift();
                flatBoard.shift();
                flatBoard.pop();
                flatBoard.pop();
                for(var i = 0; i < flatBoard.length; i++){
                    if(i % 2 === 0){
                        llDiag.push(flatBoard[i]);
                    }
                }
                if(llDiag.indexOf(player.marker) === -1 && llDiag.indexOf(computer.marker) !== -1){
                    playCoords = getBlankDiagCoords(llDiag, "ll");
                }
            } else
                playCoords = getBlankDiagCoords(ulDiag, "ul");
        }
    }
    if(playCoords === "") return playBlank();
    return playCoords;
}

function playBlank() {
    var playCoords = "";
    var rowsWithBlanks = board.filter(function(r){
        return r.indexOf("") > -1;
    });
    if(rowsWithBlanks.length > 0){
        var rdmIndex = Math.floor(Math.random() * rowsWithBlanks.length);
        playCoords = rowsWithBlanks[rdmIndex].indexOf("") + ", " + board.indexOf(rowsWithBlanks[rdmIndex]);
    }
    else {
        var cols = getColumns();
        var colsWithBlanks = cols.filter(function(c) {
            return c.indexOf("") > -1;
        });
        if(colsWithBlanks.length > 0)
            playCoords = cols.indexOf(colsWithBlanks[0]) + ", " + colsWithBlanks[0].indexOf("");
        else {
            var flatBoard = getFlattenedBoard();
            var ulDiag = [];
            var llDiag = [];
            for(var i = 0; i < flatBoard.length; i++){
                if(i % 4 === 0){
                    ulDiag.push(flatBoard[i]);
                }
            }
            if(ulDiag.indexOf("") === -1){
                flatBoard.shift();
                flatBoard.shift();
                flatBoard.pop();
                flatBoard.pop();
                for(var i = 0; i < flatBoard.length; i++){
                    if(i % 2 === 0){
                        llDiag.push(flatBoard[i]);
                    }
                }
                if(llDiag.indexOf("") !== -1){
                    playCoords = getBlankDiagCoords(llDiag, "ll");
                }
            } else
                playCoords = getBlankDiagCoords(ulDiag, "ul");
        }
    }
    return playCoords;
}

function evaluate(){
    debugger;
    var winRows = board.filter(function(r){
        return r[0] !== "" && r[0] === r[1] && r[1] === r[2];
    });
    if(winRows.length > 0){
        if(winRows[0][0] === player.marker)
            winDetails.winner = player;
        else
            winDetails.winner = computer;
        var yCoord = board.indexOf(winRows[0]);
        winDetails.cellCoords_1 = "0, " + yCoord;
        winDetails.cellCoords_2 = "1, " + yCoord;
        winDetails.cellCoords_3 = "2, " + yCoord;
    } else {
        var cols = getColumns();
        var winCols = cols.filter(function(c){
            return c[0] !== "" && c[0] === c[1] && c[1] === c[2];
        });
        if(winCols.length > 0){
            if(winCols[0][0] === player.marker)
                winDetails.winner = player;
            else
                winDetails.winner = computer;
            var xCoord = cols.indexOf(winCols[0]);
            winDetails.cellCoords_1 = xCoord + ", 0";
            winDetails.cellCoords_2 = xCoord + ", 1";
            winDetails.cellCoords_3 = xCoord + ", 2";
        } else {
            var flatBoard = getFlattenedBoard();
            var ulDiag = [];
            for(var i = 0; i < flatBoard.length; i++){
                if(i % 4 === 0){
                    ulDiag.push(flatBoard[i]);
                }
            }
            if(ulDiag[0] !== "" && ulDiag[0] === ulDiag[1] && ulDiag[1] === ulDiag[2]){
                if(ulDiag[0] === player.marker)
                    winDetails.winner = player;
                else
                    winDetails.winner = computer;
                winDetails.cellCoords_1 = "0, 0";
                winDetails.cellCoords_2 = "1, 1";
                winDetails.cellCoords_3 = "2, 2";
            } else {
                var llDiag = [];
                flatBoard.shift();
                flatBoard.shift();
                flatBoard.pop();
                flatBoard.pop();
                for(var i = 0; i < flatBoard.length; i++){
                    if(i % 2 === 0){
                        llDiag.push(flatBoard[i]);
                    }
                }
                if(llDiag[0] !== "" && llDiag[0] === llDiag[1] && llDiag[1] === llDiag[2]){
                    if(llDiag[0] === player.marker)
                        winDetails.winner = player;
                    else
                        winDetails.winner = computer;
                    winDetails.cellCoords_1 = "2, 0";
                    winDetails.cellCoords_2 = "1, 1";
                    winDetails.cellCoords_3 = "0, 2";
                }
            }
        }
    }
}

function isDraw(){
    return winDetails.winner == null && board.filter(function(r){return r.indexOf("") > - 1}).length === 0;
}

function presentDraw() {
    $('#drawModal').modal({backdrop: 'static', keyboard: false});
}

function presentWin(winner) {
    debugger;
    var cell_1_Coords = winDetails.cellCoords_1.split(",");
    var cell_1_X = cell_1_Coords[0].trim();
    var cell_1_Y = cell_1_Coords[1].trim();
    var cell_2_Coords = winDetails.cellCoords_2.split(",");
    var cell_2_X = cell_2_Coords[0].trim();
    var cell_2_Y = cell_2_Coords[1].trim();
    var cell_3_Coords = winDetails.cellCoords_3.split(",");
    var cell_3_X = cell_3_Coords[0].trim();
    var cell_3_Y = cell_3_Coords[1].trim();
    $('.square[data-x-coord="' + cell_1_X + '"][data-y-coord="' + cell_1_Y + '"], .square[data-x-coord="' + cell_2_X + '"][data-y-coord="' + cell_2_Y + '"], .square[data-x-coord="' + cell_3_X +'"][data-y-coord="' + cell_3_Y + '"]').fadeOut(1000, function(){
        $(this).css("background-color", "#bb00ff");
    }).fadeIn(1000);
    var playerWins = winDetails.winner === player;
    var winTitle = "Tu " + (playerWins ? "Ganaste" : "Perdiste") + "!";
    var winMessage = playerWins ? 
        "<p>Felicitaciones! ¡Has demostrado que puedes ser más astuto que una máquina que es superior a ti en casi todos los sentidos!</p>" :
    "<p>Haz clic en el botón Jugar de nuevo para darle realmente a la máquina un motivo, o haz clic en el botón Cerrar para maravillarte con tu victoria.</p>";
    $('.modal-win-title').text(winTitle);
    $('#modalText').html(winMessage);
    $("#winModal").modal({backdrop: 'static', keyboard: false});
    $('#' + winner + 'Wins').text(parseInt($('#' + winner + 'Wins').text()) + 1);
}

function reset(modal) {
    if ($('#'+modal+'Modal').is(":visible")) 
        $('#'+modal+'Modal').modal("toggle");
    winDetails.setDefault();
    $(".square").fadeOut(1000, function(){
        $(this).css("background-color", "#ff6801");
        $(this).empty();
    }).fadeIn(1000);
    board = getNewBoard();
    $('#playModal').modal({background: 'static', keyboard: false});
}

function getNewBoard() {
    return [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
}

function getColumns(){
    var cols = [];
    for (var i = 0; i < board.length; i++) {
        cols.push([board[0][i], board[1][i], board[2][i]]);
    }
    return cols;
}

function getFlattenedBoard(){
    return [].concat.apply([], board);
}