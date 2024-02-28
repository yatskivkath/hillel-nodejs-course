import * as constants from "../constants.js";

const validateLogLevel = (level) => {
    return !!level && Object.values(constants.level).includes(level);
}

const validateAppender = (appender) => {
    return !!appender && Object.values(constants.appender).includes(appender);
}

export {
    validateLogLevel,
    validateAppender,
}