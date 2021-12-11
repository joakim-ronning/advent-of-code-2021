const createPoint = (x, y, value) => {return {x, y, value, hasFlashed: false}}

const flashPoint = (point) => {
    if(point === undefined){
        return 0;
    }

    const energizeAndFlashPoint = point => {
        if(!point.hasFlashed){
            point.value = point.value + 1;
            return flashPoint(point);
        }
        return 0;
    }

    //flash, but only once.
    if(point.value > 9 && !point.hasFlashed){
        point.hasFlashed = true;
        const neighborFlashes = [point.topStart, point.top,point.topEnd, point.start,point.end,point.bottomStart,point.bottom,point.bottomEnd]
        .filter(point => point)
        .map(neighbor => energizeAndFlashPoint(neighbor))
        .reduce((a,b) => a+b, 0);
        return neighborFlashes + 1;
    }else{
        return 0;
    };
}

const resetPoint = point => {
    if(point === undefined){
        console.log('point undefined. but why?');

    }
    if(point.hasFlashed){
        point.hasFlashed = false;
        point.value = 0;
    }
}

const getPoints = data => {
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
            const isEnd = j === currentString.length-1;
            const point = createPoint(i,j, parseInt(current));
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
            if(!isTop && !isStart){
                const topStartPoint = getPoint(i-1, j-1);
                point.topStart = topStartPoint;
                topStartPoint.bottomEnd = point;
            }
            if(!isTop && !isEnd){
                const topEndPoint = getPoint(i-1, j+1);
                point.topEnd = topEndPoint;
                topEndPoint.bottomStart = point;
            }
        }
    };
    return points;
}

const step = points => {
    //each step add 1 value to each octopus
    points.forEach(point => point.value = point.value + 1);
    
    //each octopus flashes if it can.
    const flashCounter = points.map(point => flashPoint(point)).reduce((a,b) => a+b, 0);

    //all flashing octopi use all their energy.
    points.forEach(point => resetPoint(point));

    //return the number of flashes for that step.
    return flashCounter;
}

module.exports = {getPoints, step};