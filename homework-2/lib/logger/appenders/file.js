import formaters from "../utils/formatMessage.js";
import fs from "fs";

function log(date, level, category, message) {
    const text = formaters.formatMessage(date, level, category, message) + '\n';
    const path = process.env.LOG_FILE ?? "app.log";

    fs.appendFile(path, text, {} , () => {})
}

export default {log}