const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const generateHash = (len = 5) => {
    if(!Number(len)) {
        throw new Error("Please send a correct string length");
    }

    let result = "";
    for(let i = 0; i< len; i++) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
    }

    return result;
};

export {
    generateHash,
}