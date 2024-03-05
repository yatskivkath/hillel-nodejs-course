import { Transform } from "stream";

import * as constants from "../../constants.js"

class ErrorFilterTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true,
        });
    }

    _transform(chunk, _, callback) {
        if(chunk.level === constants.level.ERROR) {
            callback(null, chunk);
        } else {
            callback(null, null);
        }
    }
}

export {ErrorFilterTransformer}