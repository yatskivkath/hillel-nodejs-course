import config from "../config/config.js";
import * as constants from "../constants.js";

function log(date, level, category, message, formatter) {
    if(config.format === constants.format.CSV) {
        console.trace("Appender does not support this format.");
        return;
    }

    console.log(formatter.format(date, level, category, message));
}

export default {log}