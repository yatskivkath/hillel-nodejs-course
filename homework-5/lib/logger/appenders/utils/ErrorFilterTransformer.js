import { Transform } from "stream";

import * as constants from "../../constants.js"

class ErrorFilterTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true,
        });
    }

    _transform(chunk, _, next) {
        if(chunk.level === constants.level.ERROR) {
            next(null, chunk);
        } else {
            next(null, null);
        }
    }
}

export {ErrorFilterTransformer}