const fs = require('fs');

// from 5 to 10
const rows = Math.floor(Math.random() * 6) + 5;
const cols = Math.floor(Math.random() * 6) + 5;

fs.readFile(`${process.argv[2]}`, (err, data) => {
    if (err) {
        start()
    } else {
        start(data)
    };
});

function start(data) {
    let initBoard = data ? JSON.parse(data) : renderRandomBoard(rows, cols);
    console.table(initBoard)
    setInterval(() => {
        let temp = initBoard;
        initBoard = redrawBoard(temp);
        console.table(initBoard)
    }, 1000)
}

function renderRandomBoard(rows, cols) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
            const cell = Math.floor(Math.random() * 2);
            row.push(cell)
        }
        board.push(row)
    }
    return board
}

function checkNeighbours(row, col, board) {

    let liveNeighbours = 0

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && j >= 0 &&
                i < board.length &&
                j < board[i].length &&
                !(i == row && j == col) &&
                board[i][j]) {

                liveNeighbours++;
            }
        }
    }
    return liveNeighbours
}

function redrawBoard(board) {
    const newBoard = [];
    for (let i = 0; i < board.length; i++) {
        const newRow = [];
        for (let j = 0; j < board[i].length; j++) {

            if (board[i][j]) {
                if (checkNeighbours(i, j, board) < 2 || checkNeighbours(i, j, board) > 3) {
                    newRow.push(0);
                } else {
                    newRow.push(1)
                }
            } else {
                if (checkNeighbours(i, j, board) === 3) {
                    newRow.push(1)
                } else {
                    newRow.push(0)
                }
            }
        }
        newBoard.push(newRow)
    }
    return newBoard
}