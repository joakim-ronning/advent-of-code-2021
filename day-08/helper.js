const isSubset = (master, sub) => {
    return sub.split("").every(c => master.includes(c));
}

const removeSubsetFromMain = (main, sub) => {
    let result = main;
    sub.split('').forEach(n => result = result.replace(n, ''));
    return result;
}
const getWiredSignal = (digit, wireMap) => {
    if(wireMap.size < 7) {
        return '';
    }
    const wired = (digit).split('').map(a => wireMap.get(a));
    return wired.sort().join('');
}

const getDigitByLength = (digit, digitSignalMap, wireMap) => {
    switch(digit.length){
        case 2:
            return 1;
        case 3:
            return 7;
        case 4:
            return 4;
        case 5:
            if(digitSignalMap.get(1) && isSubset(digit, digitSignalMap.get(1))) {
                return 3;
            }
            if(getWiredSignal('abdfg', wireMap) === digit) {
                return 5;
            }
            if(getWiredSignal('acdeg' ,wireMap) === digit) {
                return 2;
            }
            break;
        case 6:
            if(digitSignalMap.get(4) && isSubset(digit, digitSignalMap.get(4))){
                return 9;
            }
            if(wireMap.get('d') && digitSignalMap.get(8) && digit === digitSignalMap.get(8).replace(wireMap.get('d'), '')){
                return 0;
            }
            if(digitSignalMap.get(9) && digitSignalMap.get(0) && digit !== digitSignalMap.get(9) && digit !== digitSignalMap.get(0)){
                return 6;
            }
            break;
        case 7:
            return 8;
        default:
            return -1;
    }
}

const checkAndAddDigit = (signal, digitSignalMap, wireMap) => {
    const digit = getDigitByLength(signal, digitSignalMap, wireMap);
    if(digit && digit !== -1){
        digitSignalMap.set(digit, signal);
    }
}

const getA = digitSignalMap => {
    return removeSubsetFromMain(digitSignalMap.get(7), digitSignalMap.get(1));
}

const getG = (digitSignalMap, wireMap) => {
    return removeSubsetFromMain(digitSignalMap.get(9), digitSignalMap.get(4)).replace(wireMap.get('a'), '');    
}

const getD = (digitSignalMap, wireMap) => {
    return removeSubsetFromMain(digitSignalMap.get(3),digitSignalMap.get(1))
    .replace(wireMap.get('a'), '')
    .replace(wireMap.get('g'), '');
}

const getC = (digitSignalMap) => {
    return removeSubsetFromMain('abcdefg', digitSignalMap.get(6));
}

const getE = (digitSignalMap) => {
    return removeSubsetFromMain('abcdefg', digitSignalMap.get(9));

}

const getF = (digitSignalMap, wireMap) => {
    return digitSignalMap.get(1)
    .replace(wireMap.get('c'), '');
}

const getB = (wireMap) => {
    let all = 'abcdefg';
    return all
    .replace(wireMap.get('a'), '')
    .replace(wireMap.get('c'), '')
    .replace(wireMap.get('d'), '')
    .replace(wireMap.get('e'), '')
    .replace(wireMap.get('f'), '')
    .replace(wireMap.get('g'), '');
}

const invertMap = map => {
    const result = new Map();
    for(const key of map.keys()) {
        result.set(map.get(key), key);
    };
    return result;
}
const getSignalDigitMap = signals => {
    signals = signals.map(signal => signal.split('').sort().join('')).sort((a,b) => a.length - b.length);
    const wireMap = new Map();
    const digitSignalMap = new Map();
    signals.forEach(signal => {checkAndAddDigit(signal, digitSignalMap, wireMap)});
    wireMap.set('a', getA(digitSignalMap));
    wireMap.set('g', getG(digitSignalMap, wireMap));
    wireMap.set('d', getD(digitSignalMap, wireMap));
    signals.forEach(signal => {checkAndAddDigit(signal, digitSignalMap, wireMap)});
    signals.forEach(signal => {checkAndAddDigit(signal, digitSignalMap, wireMap)});
    signals.forEach(signal => {checkAndAddDigit(signal, digitSignalMap, wireMap)});
    wireMap.set('c', getC(digitSignalMap));
    wireMap.set('e', getE(digitSignalMap));
    wireMap.set('f', getF(digitSignalMap, wireMap));
    wireMap.set('b', getB(wireMap));
    signals.forEach(signal => {checkAndAddDigit(signal, digitSignalMap, wireMap)});
    console.log(digitSignalMap.get(undefined));
    digitSignalMap.delete(undefined);
    return invertMap(digitSignalMap);
}

const getPatternOutputObject = input => {
    const results = input.split(" | ");
    return {patterns: results[0].split(" "), output: results[1].split(" ")};
}

const getOutputs = inputs => {
    return inputs.map(input => getPatternOutputObject(input).output);
}

module.exports = {getOutputs, getPatternOutputObject, getSignalDigitMap}
