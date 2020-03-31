let field = [[0,0,0], [0,0,0], [0,0,0]];
let currentPlayer;
let winnerId = 0;

function getField() {
    return field;
}

function makeMove(x,y) {
    field[y-1][x-1] = currentPlayer;

    updateWinners(field);

    if(currentPlayer == 1) {
        currentPlayer = 2;
    }
    else {
        currentPlayer = 1;
    }

}

function checkMove(x,y) {

    if(currentPlayer == undefined) {
        setCurrentPlayer(1);
    }    

    if(field[0][0] == undefined) {
        reset();
    }

    if(field[y-1][x-1] == 0) {
        return "ok";     
    } else {
        return "not ok";     
    }
}

function reset() {
    field = [[0,0,0], [0,0,0], [0,0,0]];
}

function updateWinners(field){
    //gorizontal
    for(let row=0; row<3; row++ ) {
        if( field[row][0] == field[row][1] && field[row][0] == field[row][2] ){
            winnerId = field[row][0];
        }
    }

    //vertical
    for(let column=0; column<3; column++ ) {
        if( field[0][column] == field[1][column] && field[0][column] == field[2][column] ){
            winnerId = field[0][column];
        }
    }

    if( field[0][0] == field[1][1] && field[0][0] == field[2][2] ){
        winnerId = field[0][0];
    }

    if( field[2][0] == field[1][1] && field[2][0] == field[0][2] ){
        winnerId = field[2][0];
    }
}

function presetField(newField) {
    field = newField;
}

function getWinner(){
    return winnerId;
}

function setCurrentPlayer(i) {
    currentPlayer = i;
}

function getCurrentPlayer(i) {
    return currentPlayer;
}

module.exports = {
    getField,
    makeMove,
    reset,
    presetField,
    setCurrentPlayer,
    getCurrentPlayer,
    checkMove,
    getWinner,
}
