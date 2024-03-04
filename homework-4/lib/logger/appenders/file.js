import fs from "fs";
import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { eventEmitter } from "../emmiter/emitterStrategy.js";
import { Readable } from "node:stream";
import { normalize } from "path";
import { endlineAppender } from "./utils/endlineAppender.js";

const formatter = formatterStrategy.getFormatter();

function listen() {
    const path = process.env.LOG_FILE ?? "app.log";
    // const error_path = path.substring(0, path.lastIndexOf('.')) + '_error' + path.substring(path.lastIndexOf('.'));  

    const readStream = new Readable({
        objectMode: true,
        read() {}
    });

    const writeStream = fs.createWriteStream(normalize(path), {encoding: "utf-8", flags: "a+"});

    readStream.pipe(formatter.format).pipe(endlineAppender).pipe(writeStream);

    eventEmitter.on("log", (date, level, category, message) => {
        readStream.push({date, level, category, message});
    });

    function destroyStreams() {
        readStream.destroy();
        writeStream.destroy();
    }
    
    process.on('exit', destroyStreams);
    process.on('SIGINT', destroyStreams);
    process.on('SIGUSR1', destroyStreams);
    process.on('SIGUSR2', destroyStreams);
    process.on('uncaughtException', destroyStreams);
}

export default {listen}