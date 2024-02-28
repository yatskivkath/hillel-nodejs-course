import formaters from "../utils/formatMessage.js";
import * as constants from "../constants.js";
import fs from "fs";

const CSV_HEADER = "Date;Level;Category;Message\n"

function logDefault(timestamp, level, category, message, format) {
    const path = process.env.LOG_FILE ?? "app.log";
    const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  
    const text = formaters.formatMessage(timestamp, level, category, message, format) + '\n';
    
    fs.appendFile(path, text, {} , (err) => {
        if(err) throw err;
    });

    if (level === constants.level.ERROR) {
        fs.appendFile(error_path, text, {}, (err) => {
            if(err) throw err;
        });
    }
}

function logCsv(timestamp, level, category, message, format) {
    const date = new Date(timestamp);
    const path = `app_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.log.csv`;
    const error_path = `app_error_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.log.csv`;
    const text = formaters.formatMessage(date, level, category, message, format) + '\n';

    if(!fs.existsSync(path)) {
        fs.writeFileSync(path, CSV_HEADER);
    }

    if(!fs.existsSync(error_path)) {
        fs.writeFileSync(error_path, CSV_HEADER);
    }

    fs.appendFile(path, text, {} , (err) => {
        if(err) throw err;
    });

    if (level === constants.level.ERROR) {
        fs.appendFile(error_path, text, {}, (err) => {
            if(err) throw err;
        });
    }
}

function log(timestamp, level, category, message, format) {
    switch (format) {
        case constants.format.CSV: {
            return logCsv(timestamp, level, category, message, format);
        }
        default: {
            return logDefault(timestamp, level, category, message, format);
        }
    }
}

export default {log}