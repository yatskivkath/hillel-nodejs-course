import {Transform} from "stream";

class EndineTransformer extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, _, next) {
        const s = chunk.toString("utf8") + "\n";
        next(null, s);
    }
}

export {EndineTransformer}