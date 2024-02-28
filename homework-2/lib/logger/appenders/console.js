import formaters from "../utils/formatMessage.js";
import * as constants from "../constants.js";

function log(date, level, category, message, format) {
    if(format === constants.format.CSV) {
        throw new Error("Appender does not support this format.")
    }
    
    console.log(formaters.formatMessage(date, level, category, message, format));
}

export default {log}