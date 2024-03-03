import * as constants from "./constants.js";
import config from "./config.js";

import consoleAppender from "./appenders/console.js"
import fileAppender from "./appenders/file.js"

const appenderFunctions = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]: consoleAppender,
}
function getAppenders(){
    const appenders = [];
    for(const appender of config.appenders) {
        appenders.push(appenderFunctions[appender])
    }
    
    return appenders;
}

export {getAppenders}