const getBoards = data => {
    const boards = [];
    let currentBoard = new Array();
    for(let i=3; i<data.length;i++){
        const current = data[i];
        if(current === ""){
            boards.push(currentBoard);
            currentBoard =  new Array();
        }else {
            const currentNumbers = current.split(" ").filter(n => n !== "").map(n => parseInt(n));
            currentBoard.push(currentNumbers);
        }
    }
    return boards;
}

const markNumberOnBoard = (board, current) => {
    for (let x = 0; x < board.length; x++) {
        board[x] = board[x].map(n => n === current ? -1 : n);
    }
};

const getColumns = board => {
    const columns = [];
    for(let i = 0; i < board.length; i++){
        const column = [];
        board.forEach(row => column.push(row[i]));
        columns.push(column);
    }
    return columns;
}

const getSum = board => [].concat(...board).filter(n => n >= 0).reduce((a,b) => a+b, 0);

const getScore = (board, num) => {
    return getSum(board) * num;
}

const isWinner = board => {
    if(board.find(row => row.every(n => n === -1))){
        return true;
    }
    if(getColumns(board).find(column => column.every(n => n === -1))){
        return true;
    }
    return false;
}

module.exports = { getScore, getSum, isWinner, getBoards, markNumberOnBoard}