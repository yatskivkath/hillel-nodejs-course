import formaters from "../utils/formatMessage.js";
import fs from "fs";

function log(date, level, category, message) {
    const text = formaters.formatMessage(date, level, category, message) + '\n';
    fs.appendFile("app.log", text, {} , () => {})
}

export default {log}