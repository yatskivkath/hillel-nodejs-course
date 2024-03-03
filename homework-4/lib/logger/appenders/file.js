import fs from "fs";
import config from "../config/config.js";
import * as constants from "../constants.js";
import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { eventEmitter } from "../emmiter/emitterStrategy.js";

const formatter = formatterStrategy.getFormatter();

const CSV_HEADER = "Date;Level;Category;Message\n"

function logDefault(timestamp, level, category, message) {
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

function logCsv(timestamp, level, category, message) {
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

function listen() {
    console.log("file")
    switch (config.format) {
        case constants.format.CSV: {
            eventEmitter.on("log", (timestamp, level, category, message) => {
                logCsv(timestamp, level, category, message);
            })
        }
        default: {
            eventEmitter.on("log", (timestamp, level, category, message) => {
                logDefault(timestamp, level, category, message);
            })
        }
    }
}

export default {listen}