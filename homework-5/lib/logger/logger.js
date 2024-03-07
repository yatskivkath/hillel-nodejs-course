import config from "./config/config.js";
import {scoreLevel, level} from "./constants.js";
import * as appenderStrategy from "./appenders/appenderStrategy.js"
import { eventEmitter } from "./emmiter/emitterStrategy.js";

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
for(const appender of appenders) {
    appender.listen();
}

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        eventEmitter.emit("log", Date.now(), level, category, message);
    }
}

export default {
    getLogger(category) {
        return logger(category);
    }
};