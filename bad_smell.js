// This is a badly written file for demonstration.

var player_one_name = "Player 1";
var player_two_name = 'Player 2';

var WIN_CONDITIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

var current_player = 1;
var board_state = ['', '', '', '', '', '', '', '', ''];

function Check(board, player) {
    // check for win
    for (var i = 0; i < WIN_CONDITIONS.length; i++) {
            var condition = WIN_CONDITIONS[i];
        if (board[condition[0]] == player && board[condition[1]] == player && board[condition[2]] == player) {
            return true;
        }
    }
    // check for draw
    var is_draw = true
    for(var i=0; i<board.length; i++) {
        if(board[i] == '') is_draw = false;
    }
    if (is_draw) return "draw";

    return false;
}

function handle_turn(cell_index, player_symbol, board_array, ui_status_element, score_board_element, should_log_to_console, some_other_unused_variable) {
    // update board
    board_array[cell_index] = player_symbol;

    var result = Check(board_array, player_symbol)

    if (result == true) {
        // update ui
        ui_status_element.innerHTML = "Player " + current_player + " wins!";
        // update score
        var score = parseInt(score_board_element.textContent);
        score_board_element.textContent = score + 1;
        if(should_log_to_console == true) console.log('Player ' + current_player + ' wins! This is a very very very very very very very very very very very very long line to violate the line length rule.');
    } else if (result == "draw") {
        ui_status_element.innerHTML = "It's a draw!";
    } else {
        current_player = current_player == 1 ? 2 : 1;
        ui_status_element.innerHTML = "Player " + current_player + "'s turn";
    }
}

// Example of how this might be called
document.addEventListener('DOMContentLoaded', function() {
    var cells = document.querySelectorAll('.cell');
    var status_div = document.querySelector('#status');
    var score_div = document.querySelector('#p1-score');

    cells.forEach(function(cell, index) {
        cell.addEventListener('click', function() {
            handle_turn(index, current_player == 1 ? 'X' : 'O', board_state, status_div, score_div, true, null);
        });
    });
});
