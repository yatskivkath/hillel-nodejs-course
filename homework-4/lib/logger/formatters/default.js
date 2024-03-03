import { concatMessage } from "../utils/stringFunctions.js";
import {Transform} from "node:stream";

// function format (date, level, category, message) {
//     return `Date: ${date}, category: ${category}, level: ${level}, message: ${concatMessage(message)}`;
// }

const format = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, `Date: ${date}, category: ${category}, level: ${level}, message: ${concatMessage(message)}`);
    }
})

export default {format}