import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js"

function concatMessage(message) {
    const delimeter = process.env.LOG_MESSAGE_DELIMETER ?? ", ";
    return message.map(m => JSON.stringify(m)).join(delimeter);
}

const logger = (category) => ({
    info: (...message) => {
        executeLog(level.INFO, category, concatMessage(message));
    },
    warn: (...message) => {
        executeLog(level.WARN, category, concatMessage(message));
    },
    error: (...message) => {
        executeLog(level.ERROR, category, concatMessage(message));
    },
    debug: (...message) => {
        executeLog(level.DEBUG, category, concatMessage(message));
    },
    trace: (...message) => {
        executeLog(level.TRACE, category, concatMessage(message));
    },
});

const appenders = appenderStrategy.getAppenders();
const format = appenderStrategy.gerFormat();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        for(const appender of appenders) {
            appender.log(Date.now(), level, category, message, format);
        }
    }
}



export default {
    getLogger(category) {
        return logger(category);
    }
};