import {Transform} from "stream";

class PayloadTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true,
        });
    }

    _transform(chunk, _, next) {
        const chunk_payload = {
            ...chunk,
            payload: process.argv[1],
        };
        next(null, chunk_payload);
    }
}

export {PayloadTransformer}