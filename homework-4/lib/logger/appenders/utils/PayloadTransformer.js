import {Transform} from "stream";

class PayloadTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true,
        });
    }

    _transform(chunk, _, callback) {
        const chunk_payload = {
            ...chunk,
            payload: process.argv[1],
        };
        callback(null, chunk_payload);
    }
}

export {PayloadTransformer}