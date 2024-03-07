import { Readable } from "stream";

import * as constants from "../../constants.js"

class ReadStream extends Readable {
    constructor(options) {
        super({
            ...options,
            objectMode: true,
        });
    }

    _read(){}
}

export {ReadStream}