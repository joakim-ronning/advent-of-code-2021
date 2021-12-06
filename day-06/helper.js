const countBatch = pool => {
    const newPool = [pool[1], pool[2], pool[3], pool[4], pool[5], pool[6], pool[7] + pool[0], pool[8], pool[0]];
    return newPool;
}

module.exports = { countBatch }