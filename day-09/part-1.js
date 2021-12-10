const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile();

const lowestPoints = [];
for(let i=0; i<data.length;i++){
    const currentString = data[i];
    const isTop = i === 0;
    const isBottom = i === data.length-1;
    for(let j=0;j<currentString.length;j++){
        const current = currentString.charAt(j);
        const isStart = j === 0;
        const isEnd = j === currentString.length-1;

        const checkLower = (isEdge, targetString, targetCharIndex) => isEdge || current < targetString.charAt(targetCharIndex);


        const isLowest = 
            checkLower(isTop, data[i-1], j) &&
            checkLower(isBottom, data[i+1], j) &&
            checkLower(isStart, currentString, j-1) &&
            checkLower(isEnd, currentString, j+1);
   
        if(isLowest){
            lowestPoints.push(parseInt(current) + 1);
        }
    };
};

console.log(lowestPoints.reduce((a,b) => a + b, 0));
