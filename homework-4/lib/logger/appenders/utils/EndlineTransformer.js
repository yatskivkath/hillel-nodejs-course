import {Transform} from "stream";

class EndineTransformer extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, _, callback) {
        const s = chunk.toString("utf8") + "\n";
        callback(null, s);
    }
}

export {EndineTransformer}