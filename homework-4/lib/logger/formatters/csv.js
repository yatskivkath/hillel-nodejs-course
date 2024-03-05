import {Transform} from "stream";

import { concatMessage } from "../utils/stringFunctions.js";

class CsvFormatTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        });
    }

    _transform(chunk, _, next) {
        const {date, level, category, message, payload} = chunk;
        next(null, `${date};${level};${category};${concatMessage(message)};${payload}`);
    }
}

export default {
    FormatTransformer: CsvFormatTransformer
}