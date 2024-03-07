import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { EndineTransformer } from "./utils/EndlineTransformer.js";
import { PayloadTransformer } from "./utils/PayloadTransformer.js";
import config from "../config/config.js";
import * as constants from "../constants.js";
import {eventEmitter } from "../emmiter/emitterStrategy.js";
import { ReadStream } from "./utils/ReadStream.js";

const formatter = formatterStrategy.getFormatter();

function listen() { 
    if(config.format === constants.format.CSV) {
        console.trace("Appender does not support this format.");
        return;
    }

    const readStream = new ReadStream;

    readStream
        .pipe(new PayloadTransformer)
        .pipe(new formatter.FormatTransformer)
        .pipe(new EndineTransformer)
        .pipe(process.stdout);

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