import fs from "fs";
import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { eventEmitter } from "../emmiter/emitterStrategy.js";
import { Readable } from "node:stream";
import { normalize } from "path";
import { EndineTransformer } from "./utils/EndlineTransformer.js";
import { ErrorFilterTransformer } from "./utils/ErrorFilterTransformer.js"

const formatter = formatterStrategy.getFormatter();

function listen() {
    const path = process.env.LOG_FILE ?? "app.log";
    const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  

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