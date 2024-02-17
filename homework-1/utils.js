const generateHash = (len) => {
    if(!Number(len)) {
        console.error("Please send a coorect string length");
    }

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = "";
    for(let i = 0; i< len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

module.exports = generateHash;