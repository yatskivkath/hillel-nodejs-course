import {Transform} from "stream";
class JsonFormatTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        });
    }

    _transform(chunk, _, next) {
        next(null, JSON.stringify(chunk));
    }
}

export default {
    FormatTransformer: JsonFormatTransformer
}