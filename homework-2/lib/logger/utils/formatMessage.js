import * as constants from "../constants.js";

function concatMessage(message) {
    const delimeter = process.env.LOG_MESSAGE_DELIMETER ?? ", ";
    return message.map(m => JSON.stringify(m)).join(delimeter);
}

function formatMessageDefault(date, level, category, message) {
    return `Date: ${date}, category: ${category}, level: ${level}, message: ${concatMessage(message)}`;
}

function formatMessageJson(date, level, category, message) {
    return JSON.stringify({
        date,
        level,
        category,
        message,
    });
}

function formatMessageCsv(date, level, category, message) {
    return `${date};${level};${category};${message}`;
}

function formatMessage(date, level, category, message, format = constants.format.DEFAULT) {
    switch (format) {
        case constants.format.JSON: {
            return formatMessageJson(date, level, category, message);
        }
        case constants.format.DEFAULT: {
            return formatMessageDefault(date, level, category, message);
        }
        case constants.format.CSV: {
            return formatMessageCsv(date, level, category, message);
        }
    }
}

export default {formatMessage};