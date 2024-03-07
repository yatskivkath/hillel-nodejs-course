import * as constants from "../constants.js";
import config from "../config/config.js";
import consoleAppender from "./console.js"
import fileAppender from "./file.js"
import networkAppender from "./network.js";

const appenderFunctions = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [constants.appender.NETWORK]: networkAppender,
}

function getAppenders() {
    const appenders = [];
    for(const appender of config.appenders) {
        appenders.push(appenderFunctions[appender])
    }
    
    return appenders;
}

export {getAppenders}