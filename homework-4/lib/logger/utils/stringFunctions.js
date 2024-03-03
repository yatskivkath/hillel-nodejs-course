function concatMessage(message) {
    const delimeter = process.env.LOG_MESSAGE_DELIMETER ?? ", ";
    return message.map(m => JSON.stringify(m)).join(delimeter);
}

export {concatMessage}