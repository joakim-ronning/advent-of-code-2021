const { getStringArrayFromFile } = require("../utils/fileLoader");

const data = getStringArrayFromFile();

let depth = 0;
let horizontal = 0;
let aim = 0;

data.forEach(instructionPair => {
    const splitInstruction = instructionPair.split(" ");
    const instruction = splitInstruction[0];
    const amount = parseInt(splitInstruction[1]);
    switch (instruction){
        case 'forward': horizontal += amount;
        depth += aim*amount;
        break;
        case 'up': aim -= amount;
        break;
        case 'down': aim += amount;
        break;
    }
});

console.log('answer: ' + depth*horizontal);