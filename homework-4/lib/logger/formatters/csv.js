import {Transform} from "stream";

import { concatMessage } from "../utils/stringFunctions.js";

class CsvFormatTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        });
    }

    _transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, `${date};${level};${category};${concatMessage(message)}`);
    }
}

export default {
    FormatTransformer: CsvFormatTransformer
}