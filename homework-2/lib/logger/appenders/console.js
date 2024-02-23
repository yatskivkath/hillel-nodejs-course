import formaters from "../utils/formaters.js";

function log(date, level, category, message) {
    console.log(formaters.formatMessage(date, level, category, message));
}

export default {log}