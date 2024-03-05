import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { Readable } from "stream"
import { EndineTransformer } from "./utils/EndlineTransformer.js";

import config from "../config/config.js";
import * as constants from "../constants.js";
import {eventEmitter } from "../emmiter/emitterStrategy.js";

const formatter = formatterStrategy.getFormatter();

function listen() { 
    if(config.format === constants.format.CSV) {
        console.trace("Appender does not support this format.");
        return;
    }

    const readStream = new Readable({
        objectMode: true,
        read() {}
    });

    readStream.pipe(new formatter.FormatTransformer).pipe(new EndineTransformer).pipe(process.stdout);

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