import formaters from "../utils/formatMessage.js";
import * as constants from "../constants.js";
import fs from "fs";

const path = process.env.LOG_FILE ?? "app.log";
const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  

function log(date, level, category, message) {
    const text = formaters.formatMessage(date, level, category, message) + '\n';
    
    fs.appendFile(path, text, {} , () => {});

    if(level === constants.level.ERROR) {
        fs.appendFile(error_path, text, {}, () => {});
    }
}

export default {log}