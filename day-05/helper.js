const expandCoordinates = (coordinates, orientation, includeDiagonals = false) => {
    const expandedCoordinates = [];

    if(orientation === 'vertical'){
        const [from, to] = coordinates.y2 > coordinates.y1 ? [coordinates.y1, coordinates.y2] : [coordinates.y2, coordinates.y1];
        for(let i = from; i<=to; i++) {
            expandedCoordinates.push([coordinates.x1, i]);
        }
    }

    if(orientation === 'horizontal') {
        const [from, to] = coordinates.x2 > coordinates.x1 ? [coordinates.x1, coordinates.x2] : [coordinates.x2, coordinates.x1];
        for(let i = from; i<=to; i++) {
            expandedCoordinates.push([i, coordinates.y1]);
        }
    }
    if(includeDiagonals && orientation === 'diagonal') {
        const isPositiveX = coordinates.x1 < coordinates.x2 ? 1 : -1;
        const isPositiveY = coordinates.y1 < coordinates.y2 ? 1 : -1;
        const diff = Math.abs(coordinates.x2-coordinates.x1);
        for(let i=0; i <= diff; i++){
            expandedCoordinates.push([coordinates.x1 + (i * isPositiveX), coordinates.y1 + (i * isPositiveY)]);
        }
    }

    return expandedCoordinates;
};

const getOrientation = ({ x1, y1, x2, y2 }) => {
    if(x1 === x2){
        return 'vertical';
    } 
    if(y1 === y2){
        return 'horizontal';
    }
    return 'diagonal';
};

const getAsCoordinates = point => {
    return point.split(",").map(n => parseInt(n));
};

const convertInputToCoordinates = input => {
   const coordinates = input.split(" -> ")
   .map(point => getAsCoordinates(point))
   .reduce((prev, current) => prev.concat(current), []);
   return {x1: coordinates[0], y1: coordinates[1], x2: coordinates[2], y2: coordinates[3]}
};

const getHorizontalVerticalLineCoordinates = input => {
    const coords = convertInputToCoordinates(input);
    const orientation = getOrientation(coords);
    return expandCoordinates(coords, orientation);
};

const getAllLineCoordinates = input => {
    const coords = convertInputToCoordinates(input);
    const orientation = getOrientation(coords);
    return expandCoordinates(coords, orientation, true);
};

module.exports = {getHorizontalVerticalLineCoordinates, getAllLineCoordinates};