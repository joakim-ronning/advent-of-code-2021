const { isBuffer } = require("util");
const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper");

const data = getStringArrayFromFile();

const createPoint = (x, y, value) => {return {x, y, value}}

const points = [];

const getPoint = (x,y) => {
    return points.find(point => point.x === x && point.y === y);
};

for(let i=0; i<data.length;i++){
    const isTop = i === 0;
    const currentString = data[i];
    for(let j=0;j<currentString.length;j++){
        const current = currentString.charAt(j);
        const isStart = j === 0;
        const point = createPoint(i,j,current);
        points.push(point);
        if(!isTop){
            const topPoint = getPoint(i-1,j);
            point.top = topPoint;
            topPoint.bottom = point;
        }
        if(!isStart){
            const startPoint = getPoint(i, j - 1);
            point.start = startPoint;
            startPoint.end = point;
        }
    }
};

const allBasins = [];

const isPointInBasins = point => {
    const result = [].concat(...allBasins).includes(point);
    return result;
}

const checkNeighbors = (point, currentBasin) => {
    if(currentBasin.includes(point)){
       return;
    }
    currentBasin.push(point);
    const checkNeighbor = neighbor => {
        if(neighbor){
            const value = neighbor.value;
            if(value !== '9'){
                checkNeighbors(neighbor, currentBasin);
            }
        }
    }
    checkNeighbor(point.top);
    checkNeighbor(point.bottom);
    checkNeighbor(point.start);
    checkNeighbor(point.end);
}

const fillBasin = seedPoint => {
    const currentBasin = [];
    allBasins.push(currentBasin);
    checkNeighbors(seedPoint, currentBasin);
}

points.forEach(point => {
    if(isPointInBasins(point)){
        return;
    }
    if(point.value === '9'){
        return;
    }
    fillBasin(point);
})

const basinSizes = allBasins.sort().reverse().map(basin => basin.length);
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);