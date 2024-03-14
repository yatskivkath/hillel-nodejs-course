const store = {};

function generate(sequenceName) {
    const sequence = store[sequenceName];
    if (!sequence) {
        store[sequenceName] = 0;
    }

    return ++store[sequenceName]
}


export {generate}