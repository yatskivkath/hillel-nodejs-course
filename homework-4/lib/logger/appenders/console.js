import config from "../config/config.js";
import * as constants from "../constants.js";
import * as formatterStrategy from "../formatters/formatterStrategy.js"

import {eventEmitter } from "../emmiter/emitterStrategy.js";

const formatter = formatterStrategy.getFormatter();

function listen() {
    console.log("console")
    if(config.format === constants.format.CSV) {
        console.trace("Appender does not support this format.");
        return;
    }

    eventEmitter.on("log", (date, level, category, message) => {
        console.log(formatter.format(date, level, category, message));
    })
}

export default {listen}