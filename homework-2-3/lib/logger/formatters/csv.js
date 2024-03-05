import { concatMessage } from "../utils/stringFunctions.js";

function format(date, level, category, message) {
    return `${date};${level};${category};${concatMessage(message)}`;
}

export default {format}