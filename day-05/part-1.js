const { getStringArrayFromFile } = require("../utils/fileLoader");
const Helper = require("./helper")

const data = getStringArrayFromFile();

const cartesianMap = new Array(999).fill(0).map(a => new Array(999).fill(0));

data.forEach(line => {
    const coordinates = Helper.getHorizontalVerticalLineCoordinates(line);
    coordinates.forEach(coordinate => {
        const x = coordinate[0];
        const y = coordinate[1];
        const value = cartesianMap[x][y];
        cartesianMap[x][y] = value + 1;
    })
})

const cartesianLine = [].concat(...cartesianMap);

const total =  cartesianLine.length;
const nonIntersections = cartesianLine.filter(n => n < 2).length;
const intersections = cartesianLine.filter(n => n > 1).length;

console.log( {total, nonIntersections, intersections} );
