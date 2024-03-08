import fs from "fs";
import { Readable } from "node:stream";
import { normalize } from "path";

import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { eventEmitter } from "../emmiter/emitterStrategy.js";
import { EndineTransformer } from "./utils/EndlineTransformer.js";
import { ErrorFilterTransformer } from "./utils/ErrorFilterTransformer.js"
import * as constants from "../constants.js";
import config from "../config/config.js";
import { PayloadTransformer } from "./utils/PayloadTransformer.js";
import { ReadStream } from "./utils/ReadStream.js";

const CSV_HEADER = "Date;Level;Category;Message;Payload\n"

const formatter = formatterStrategy.getFormatter();

let readStream;

function getNames() {
    switch(config.format) {
        case constants.format.CSV: {
            const date = new Date();
            const path = `app_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.log.csv`;
            const error_path = `app_error_${date.getDate()}_${date.getMonth()}_${date.getFullYear()}.log.csv`;

            if(!fs.existsSync(path)) {
                fs.writeFileSync(path, CSV_HEADER);
            }
        
            if(!fs.existsSync(error_path)) {
                fs.writeFileSync(error_path, CSV_HEADER);
            }
        
            return {path, error_path}
        }
        default: {
            const path = process.env.LOG_FILE ?? "app.log";
            const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  

            return {path, error_path}
        }
    }
}

function listen() {
    const {path, error_path} = getNames();

    readStream = new ReadStream;
    const writeStream = fs.createWriteStream(normalize(path), {encoding: "utf-8", flags: "a+"});
    const writeStreamError = fs.createWriteStream(normalize(error_path), {encoding: "utf-8", flags: "a+"});

    readStream
        .pipe(new PayloadTransformer)
        .pipe(new formatter.FormatTransformer)
        .pipe(new EndineTransformer)
        .pipe(writeStream);
        
    readStream
        .pipe(new ErrorFilterTransformer)
        .pipe(new PayloadTransformer)
        .pipe(new formatter.FormatTransformer)
        .pipe(new EndineTransformer)
        .pipe(writeStreamError);

    eventEmitter.on("log", (date, level, category, message) => {
        readStream.push({date, level, category, message});
    });
}

function close() {
    readStream.push(null);
}

export default {listen, close}