import config from "../config/config.js";
import * as constants from "../constants.js";
import defaultFormatter from "./default.js"
import csvFormatter from "./csv.js";
import jsonFormatter from "./json.js"

const formatterFunctions = {
    [constants.format.DEFAULT]: defaultFormatter,
    [constants.format.CSV]: csvFormatter,
    [constants.format.JSON]: jsonFormatter,
}

function getFormatter() {
    return formatterFunctions[config.format];
}

export {getFormatter}
