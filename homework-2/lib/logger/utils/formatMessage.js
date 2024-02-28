import * as constants from "../constants.js";

function formatMessageDefault(date, level, category, message) {
    return `Date: ${date}, category: ${category}, level: ${level}, message: ${message}`;
}

function formatMessageJson(date, level, category, message) {
    return JSON.stringify({
        date,
        level,
        category,
        message,
    });
}

function formatMessage(date, level, category, message, format = constants.format.DEFAULT) {
    switch (format) {
        case constants.format.JSON: {
            return formatMessageJson(date, level, category, message);
        }
        case constants.format.DEFAULT: {
            return formatMessageDefault(date, level, category, message);
        }
    }
}

export default {formatMessage};