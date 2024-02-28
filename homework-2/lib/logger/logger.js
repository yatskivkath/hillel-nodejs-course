import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js"

function messageToString(message) {
    const delimeter = process.env.LOG_MESSAGE_DELIMETER ?? ", ";
    return message.join(delimeter);
}

const logger = (category) => ({
    info: (...message) => {
        executeLog(level.INFO, category, messageToString(message));
    },
    warn: (...message) => {
        executeLog(level.WARN, category, messageToString(message));
    },
    error: (...message) => {
        executeLog(level.ERROR, category, messageToString(message));
    },
    debug: (...message) => {
        executeLog(level.DEBUG, category, messageToString(message));
    },
    trace: (...message) => {
        executeLog(level.TRACE, category, messageToString(message));
    },
});

const appenders = appenderStrategy.getAppenders();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        for(const appender of appenders) {
            appender.log(Date.now(), level, category, message);
        }
    }
}



export default {
    getLogger(category) {
        return logger(category);
    }
};