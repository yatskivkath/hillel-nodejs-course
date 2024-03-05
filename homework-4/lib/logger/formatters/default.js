import { concatMessage } from "../utils/stringFunctions.js";
import {Transform} from "stream";

class DefaultFormatTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        });
    }

    _transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, `Date: ${date}, category: ${category}, level: ${level}, message: ${concatMessage(message)}`);
    }
}

export default {
    FormatTransformer: DefaultFormatTransformer
}