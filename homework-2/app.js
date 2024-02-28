/**
 * Logger:
 *  log_level: info, warn, error, trace, debug
 *  log_score: {
 *      none: ??? 0
 *      error: 1
 *      warn: 2
 *      info: 3
 *      debug: 4
 *      trace: 5
 *  }
 *  appenders: console, file, queue, elastic...
 */

import logger from "./lib/logger/logger.js";

import color from "./color.js";
import fruit from "./fruit.js";
import {add} from "./handler.js"

const log = logger.getLogger("app.js");

log.info(color);
log.info(fruit);
log.error("ERROR occur: My log", "num", 2);
log.warn("Some warning");
log.debug("DEBUG")

try {
    throw new Error("Try Error");
} catch (err) {
    log.error(err.message);
    log.trace(err.stack)
}


add(3,5);