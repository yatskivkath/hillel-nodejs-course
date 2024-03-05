import * as constants from "../constants.js";

const validateLogLevel = (level) => {
    return !!level && Object.values(constants.level).includes(level);
}

const validateAppender = (appender) => {
    return !!appender && Object.values(constants.appender).includes(appender);
}

const validateFormat = (format) => {
    return !!format && Object.values(constants.format).includes(format);
}

export {
    validateLogLevel,
    validateAppender,
    validateFormat,
}