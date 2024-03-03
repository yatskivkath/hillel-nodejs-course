import { concatMessage } from "../utils/stringFunctions.js";
import {Transform} from "node:stream";

const format = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, `${date};${level};${category};${concatMessage(message)}`);
    }
})

export default {format}