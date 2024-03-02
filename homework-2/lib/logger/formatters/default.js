import { concatMessage } from "../utils/stringFunctions.js";

function format (date, level, category, message) {
    return `Date: ${date}, category: ${category}, level: ${level}, message: ${concatMessage(message)}`;
}

export default {format}