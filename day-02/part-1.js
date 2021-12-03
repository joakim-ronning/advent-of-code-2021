const { getStringArrayFromFile } = require("../utils/fileLoader");

const data = getStringArrayFromFile();

let depth = 0;
let horizontal = 0;

data.forEach(instructionPair => {
    const splitInstruction = instructionPair.split(" ");
    const instruction = splitInstruction[0];
    const amount = parseInt(splitInstruction[1]);
    switch (instruction){
        case 'forward': horizontal += amount;
        break;
        case 'up': depth -= amount;
        break;
        case 'down': depth += amount;
    }
});

console.log('answer: ' + depth*horizontal);