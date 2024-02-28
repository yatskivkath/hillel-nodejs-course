import formaters from "../utils/formatMessage.js";
import * as constants from "../constants.js";
import fs from "fs";

const path = process.env.LOG_FILE ?? "app.log";
const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  

function log(date, level, category, message, format) {
    const text = formaters.formatMessage(date, level, category, message, format) + '\n';
    
    fs.appendFile(path, text, {} , (err) => {
        if(err) throw err;
    });

    if(level === constants.level.ERROR) {
        fs.appendFile(error_path, text, {}, (err) => {
            if(err) throw err;
        });
    }
}

export default {log}