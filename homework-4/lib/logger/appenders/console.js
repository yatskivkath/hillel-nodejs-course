import config from "../config/config.js";
import * as constants from "../constants.js";
import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { Writable, Readable } from "stream"

import {eventEmitter } from "../emmiter/emitterStrategy.js";

const formatter = formatterStrategy.getFormatter();

const readStream = new Readable({
    objectMode: true,
    read() {}
})

const writeStream = new Writable({
    objectMode: true,
    write(chunk, _, callback) {
        console.log(chunk);
        callback();
    }
})

readStream.pipe(formatter.format).pipe(writeStream);

function listen() {
    if(config.format === constants.format.CSV) {
        console.trace("Appender does not support this format.");
        return;
    }

    eventEmitter.on("log", (date, level, category, message) => {
        readStream.push({date, level, category, message});
    })
}

export default {listen}