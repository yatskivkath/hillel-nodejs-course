import fs from "fs";
import { Readable } from "node:stream";
import { normalize } from "path";

import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { eventEmitter } from "../emmiter/emitterStrategy.js";
import { EndineTransformer } from "./utils/EndlineTransformer.js";
import { ErrorFilterTransformer } from "./utils/ErrorFilterTransformer.js";

const formatter = formatterStrategy.getFormatter();

const CSV_HEADER = "Date;Level;Category;Message\n"

function createFile(timestamp) {
    const date = new Date(timestamp);
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

function listen() {
    const {path, error_path} = createFile(Date.now());

    const readStream = new Readable({
        objectMode: true,
        read() {}
    });

    const writeStream = fs.createWriteStream(normalize(path), {encoding: "utf-8", flags: "a+"});
    const writeStreamError = fs.createWriteStream(normalize(error_path), {encoding: "utf-8", flags: "a+"});

    readStream.pipe(new formatter.FormatTransformer).pipe(new EndineTransformer).pipe(writeStream);
    readStream.pipe(new ErrorFilterTransformer).pipe(new formatter.FormatTransformer).pipe(new EndineTransformer).pipe(writeStreamError);

    eventEmitter.on("log", (date, level, category, message) => {
        readStream.push({date, level, category, message});
    });

    function destroyStreams() {
        readStream.push(null);
    }
    
    process.on('beforeExit', destroyStreams);
    process.on('SIGINT', destroyStreams);
    process.on('uncaughtException', destroyStreams);
}

export default {listen}