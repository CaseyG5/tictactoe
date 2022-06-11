let squares = ['', '', '', '', '', '', '', '', ''];
let whosTurn = 'X';
let numSquaresMarked = 0;

const currentPlayer = $('#x-or-o');

const changeHeading = () => {                       // remove intro heading upon first click
    $('#intro').hide();
    $('#whos-turn').attr('hidden', false);
};

const togglePlayer = () => {
    if( whosTurn == 'X' ) whosTurn = 'O';
    else whosTurn = 'X';
    currentPlayer.text(whosTurn);                       // update display of who's turn it is
};

const markSquare = (cellID) => {

    if( $(`#cell${cellID}`).text() == '' ) {           // if cell is blank
        $(`#cell${cellID}`).text(`${whosTurn}`);       // mark it (display)
        squares[cellID] = whosTurn;                    // mark it (data rep)
        numSquaresMarked++;                             // inc # of squares marked
                         
        if(numSquaresMarked == 1) changeHeading();      
        else if(numSquaresMarked > 4) {                 // minimum 5 required to win
            if( checkForWin(cellID) ) {                // if 3 in a line
                $('#win-msg').css('opacity', 1);        // show congrats
                numSquaresMarked = 0;
                window.setTimeout( () => {
                    $('#win-msg').css('opacity', 0);    // hide congrats after a few seconds
                    restartGame();                      // then reset game
                }, 3000);
            }
        }
        togglePlayer();                                 // toggle who's turn
    }   
};

const clearSquares = () => {                            // clear all Xs and Os
    for(let c = 0; c < 9; c++) {
        $(`#cell${c}`).text('');
    }
};

const restartGame = () => {
    clearSquares();
    squares = ['', '', '', '', '', '', '', '', ''];     
    numSquaresMarked = 0;
    $('#intro').show();                                 // reset heading
    $('#whos-turn').attr('hidden', true);
};


for(let cell = 0; cell < 9; cell++) {       // For all cells (0-8), add a CLICK event handler
    // $(`#cell${cell}`).text('');
    
    $(`#cell${cell}`).on('click', () => {
        markSquare(cell);
    });
}

$('#restart').on('click', restartGame);

const checkForWin = (squareNumber) => {
    
    switch(squareNumber) {          // check for 3 in a line based on square just marked
        case 0:
            if(squares[1] == whosTurn && squares[2] == whosTurn) return true;
            if(squares[3] == whosTurn && squares[6] == whosTurn) return true;
            if(squares[4] == whosTurn && squares[8] == whosTurn) return true;
            break;
        case 1:
            if(squares[0] == whosTurn && squares[2] == whosTurn) return true;
            if(squares[4] == whosTurn && squares[7] == whosTurn) return true;
            break;
        case 2:
            if(squares[0] == whosTurn && squares[1] == whosTurn) return true;
            if(squares[4] == whosTurn && squares[6] == whosTurn) return true;
            if(squares[5] == whosTurn && squares[8] == whosTurn) return true;
            break;
        case 3:
            if(squares[0] == whosTurn && squares[6] == whosTurn) return true;
            if(squares[4] == whosTurn && squares[5] == whosTurn) return true;
            break;
        case 4:
            if(squares[0] == whosTurn && squares[8] == whosTurn) return true;
            if(squares[1] == whosTurn && squares[7] == whosTurn) return true;
            if(squares[2] == whosTurn && squares[6] == whosTurn) return true;
            if(squares[3] == whosTurn && squares[5] == whosTurn) return true;
            break;
        case 5:
            if(squares[2] == whosTurn && squares[8] == whosTurn) return true;
            if(squares[3] == whosTurn && squares[4] == whosTurn) return true;
            break;
        case 6:
            if(squares[0] == whosTurn && squares[3] == whosTurn) return true;
            if(squares[2] == whosTurn && squares[4] == whosTurn) return true;
            if(squares[7] == whosTurn && squares[8] == whosTurn) return true;
            break;
        case 7:
            if(squares[1] == whosTurn && squares[4] == whosTurn) return true;
            if(squares[6] == whosTurn && squares[8] == whosTurn) return true;
            break;
        case 8:
            if(squares[0] == whosTurn && squares[4] == whosTurn) return true;
            if(squares[2] == whosTurn && squares[5] == whosTurn) return true;
            if(squares[6] == whosTurn && squares[7] == whosTurn) return true;
    }
    
    if(numSquaresMarked == 9) {                     // if draw then alert 
        $('#draw-msg').css('opacity', 1);
        window.setTimeout( () => {
            $('#draw-msg').css('opacity', 0);       // hide draw message after a few seconds
            restartGame();                          // then reset game
        }, 3000);
    }
};

// ALTERNATIVE IDEA TO CHECK FOR WIN:
// if cell 0 has player's mark, check 3 possibilities:  0-1-2, 0-3-6, 0-4-8
// else if cell 1 has player's mark, check:             1-4-7
// else if cell 2 does, check:                          2-4-6, 2-5-8
// else if cell 3 does, check:                          3-4-5
// else if cell 6 does, check:                          6-7-8