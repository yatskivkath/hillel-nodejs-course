import { concatMessage } from "../utils/stringFunctions.js";
import {Transform} from "stream";

class DefaultFormatTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        });
    }

    _transform(chunk, _, next) {
        const {date, level, category, message, payload} = chunk;
        next(null, `Date: ${date}, category: ${category}, level: ${level}, message: ${concatMessage(message)}, payload: ${payload}`);
    }
}

export default {
    FormatTransformer: DefaultFormatTransformer
}