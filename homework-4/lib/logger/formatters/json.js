import {Transform} from "node:stream";

const format = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, JSON.stringify({ date, level, category, message }));
    }
})

export default {format}