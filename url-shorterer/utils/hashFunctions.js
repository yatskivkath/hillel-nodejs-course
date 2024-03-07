import * as constants from "../constants.js"

const generateHash = (len = 5) => {
    if(!Number(len)) {
        throw new Error("Please send a correct string length");
    }

    let result = "";
    for(let i = 0; i< len; i++) {
        result += constants.CHARACTERS.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

export {
    generateHash,
}