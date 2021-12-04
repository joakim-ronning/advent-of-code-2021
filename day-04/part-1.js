const { getStringArrayFromFile } = require("../utils/fileLoader");
const { getScore, isWinner, getBoards, markNumberOnBoard } = require("./helper")

const data = getStringArrayFromFile();

const drawnNumbers = data[0].split(',').map(n => parseInt(n));

const boards = getBoards(data);

for (let i=0; i<drawnNumbers.length; i++) {
    const current = drawnNumbers[i];
    if(boards.length === 0){
        break;
    }
    boards.forEach(board => markNumberOnBoard(board, current));

    let winners = boards.filter(board => isWinner(board));

    if(winners.length > 0) {
        console.log(getScore(winners[0], current));
        break;
    }
}
