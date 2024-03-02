import config from "./config.js";
import * as constants from "./constants.js";

import defaultFormatter from "./formatters/default.js"
import csvFormatter from "./formatters/csv.js";
import jsonFormatter from "./formatters/json.js"

const formatterFunctions = {
    [constants.format.DEFAULT]: defaultFormatter,
    [constants.format.CSV]: csvFormatter,
    [constants.format.JSON]: jsonFormatter,
}

function getFormatter() {
    return formatterFunctions[config.format];
}

export {getFormatter}
