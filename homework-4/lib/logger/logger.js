import config from "./config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenderStrategy.js"
import * as formatterStrategy from "./formatterStrategy.js"

const logger = (category) => ({
    info: (...message) => {
        executeLog(level.INFO, category, message);
    },
    warn: (...message) => {
        executeLog(level.WARN, category, message);
    },
    error: (...message) => {
        executeLog(level.ERROR, category, message);
    },
    debug: (...message) => {
        executeLog(level.DEBUG, category, message);
    },
    trace: (...message) => {
        executeLog(level.TRACE, category, message);
    },
});

const appenders = appenderStrategy.getAppenders();
const formatter = formatterStrategy.getFormatter();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        for(const appender of appenders) {
            appender.log(Date.now(), level, category, message, formatter);
        }
    }
}


export default {
    getLogger(category) {
        return logger(category);
    }
};