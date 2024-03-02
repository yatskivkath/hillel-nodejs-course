import fs from "fs";
import config from "../config.js";
import * as constants from "../constants.js";

const CSV_HEADER = "Date;Level;Category;Message\n"

function logDefault(timestamp, level, category, message, formatter) {
    const path = process.env.LOG_FILE ?? "app.log";
    const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  
    const text = formatter.format(timestamp, level, category, message) + '\n';
    
    fs.appendFile(path, text, {} , (err) => {
        if(err) throw err;
    });

    if (level === constants.level.ERROR) {
        fs.appendFile(error_path, text, {}, (err) => {
            if(err) throw err;
        });
    }
}

function logCsv(timestamp, level, category, message, formatter) {
    const date = new Date(timestamp);
    const path = `app_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.log.csv`;
    const error_path = `app_error_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.log.csv`;
    const text = formatter.format(date, level, category, message) + '\n';

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

function log(timestamp, level, category, message, formatter) {
    switch (config.format) {
        case constants.format.CSV: {
            return logCsv(timestamp, level, category, message, formatter);
        }
        default: {
            return logDefault(timestamp, level, category, message, formatter);
        }
    }
}

export default {log}