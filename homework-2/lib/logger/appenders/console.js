import formaters from "../utils/formatMessage.js";

function log(date, level, category, message, format) {
    console.log(formaters.formatMessage(date, level, category, message, format));
}

export default {log}