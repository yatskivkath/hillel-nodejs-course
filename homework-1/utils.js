const { characters } = require("./constants.js");

const generateHash = (len) => {
    if(!Number(len)) {
        throw new Error("Please send a coorect string length");
    }

    let result = "";
    for(let i = 0; i< len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

module.exports = generateHash;