import {Transform} from "stream";
class JsonFormatTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true
        });
    }

    _transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, JSON.stringify({ date, level, category, message }));
    }
}

export default {
    FormatTransformer: JsonFormatTransformer
}