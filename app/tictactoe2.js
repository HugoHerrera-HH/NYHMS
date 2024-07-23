

var board = getNewBoard();

var players = [];

var winDets = {
    win: false,
    player: new player(),
    row: false,
    cell_1: "",
    cell_2: "",
    cell_3: "",
    setDetails: function(win, player, row, cell_1, cell_2, cell_3) {
        this.win = win;
        this.player = player;
        this.row = row;
        this.cell_1 = cell_1;
        this.cell_2 = cell_2;
        this.cell_3 = cell_3;
    },
    setDefault: function() {
        this.win = false;
        this.player = new player();
        this.row = false;
        this.cell_1 = "";
        this.cell_2 = "";
        this.cell_3 = "";
    }
};

$(function() {
    var player1 = new player("X", true);
    var player2 = new player("O", false);
    players = [player1, player2];
    $(".square").click(function() {
        if (!winDets.win) {
            if ($(this).children().length == 0) {
                var player = players.filter(function(p) {
return p.turn; })[0];
                var marker = player.marker;
                var row = $(this).data("y-coord");
                var col = $(this).data("x-coord");
                $(this).append('<div class="text-center">' + marker + "</div>");
                evaluate(row, col, marker);

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

function player(marker, turn) {
    this.marker = marker;
    this.turn = turn;
}

function evaluate(row, col, marker) {
    board[row][col] = marker;
    var player = players.filter(function(p) {
        return p.marker == marker;
    })[0];
    var win = false;
    for (var i = 0; i < 3; i++) {
        win =
            board[i].filter(function(s) {
                return s == marker;
            }).length === 3;
        if (win) {
            winDets.setDetails(true, player, true, "0, " + i, "1, " + i, "2, " +i);
            break;
        }
        win =
            board[0][i] == marker &&
            board[1][i] == marker &&
            board[2][i] == marker;
        if (win) {
            winDets.setDetails(true, player, false, i + ", 0", i + ", 1", i + ", 2");
            break;
        }
    }
    if (!win) {
        win =
            board[0][0] == marker &&
            board[1][1] == marker &&
            board[2][2] == marker;
        if (win) {
            winDets.setDetails(true, player, undefined, "0, 0", "1, 1", "2, 2");
        } else {
            win =
                board[0][2] == marker &&
                board[1][1] == marker &&
                board[2][0] == marker;
            if (win) {
                winDets.setDetails(true, player, undefined, "2, 0", "1, 1", "0, 2");
            }
        }
    }
    if(!win && [].concat.apply([], board).filter(function(s){ return s === ''; }).length == 0)
        winDets.setDetails(false, undefined, undefined, "", "", "");
    if (!winDets.win){
                    if(!winDets.win && winDets.row === undefined)
                        presentDraw();
                    players = players.filter(function(p) {
                        if (p.turn) p.turn = false;
                        else p.turn = true;
                        return p;
                    });
                    $('#playerTurn').text(players.filter(function(p){return p.turn;})[0].marker);
                }
                else presentWin();
}

function presentDraw() {
    $('#drawModal').modal({backdrop: 'static', keyboard: false});
}

function presentWin() {
    var cell_1_Coords = winDets.cell_1.split(",");
    var cell_1_X = cell_1_Coords[0].trim();
    var cell_1_Y = cell_1_Coords[1].trim();
    var cell_2_Coords = winDets.cell_2.split(",");
    var cell_2_X = cell_2_Coords[0].trim();
    var cell_2_Y = cell_2_Coords[1].trim();
    var cell_3_Coords = winDets.cell_3.split(",");
    var cell_3_X = cell_3_Coords[0].trim();
    var cell_3_Y = cell_3_Coords[1].trim();
    $('.square[data-x-coord="' + cell_1_X + '"][data-y-coord="' + cell_1_Y + '"], .square[data-x-coord="' + cell_2_X + '"][data-y-coord="' + cell_2_Y + '"], .square[data-x-coord="' + cell_3_X +'"][data-y-coord="' + cell_3_Y + '"]').fadeOut(1000, function(){
        $(this).css("background-color", "#bb00ff");
    }).fadeIn(1000);
    $('#' + winDets.player.marker.toLowerCase() + 'Wins').text(parseInt($('#' + winDets.player.marker.toLowerCase() + 'Wins').text()) + 1);
    $(".modal-win-title").text("Jugador " + winDets.player.marker + " Ganaste!");
    $("#modalText").text(
        "Felicitaciones, Jugador " +
            winDets.player.marker +
            "! Si quieres volver a jugar, haz clic en el botón Jugar de nuevo que aparece a continuación. Si solo desea admirar su victoria, haga clic en el botón Cerrar a continuación."
    );
    $("#winModal").modal({backdrop: 'static', keyboard: false});
}

function reset(modal) {
    if ($('#'+modal+'Modal').is(":visible")) 
        $('#'+modal+'Modal').modal("toggle");
    winDets.setDefault();
    $(".square").fadeOut(1000, function(){
        $(this).css("background-color", "#ff6801");
        $(this).empty();
    }).fadeIn(1000);
    board = getNewBoard();
}

function getNewBoard() {
    return [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
}