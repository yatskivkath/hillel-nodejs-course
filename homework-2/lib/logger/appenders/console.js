function log(date, level, category, message, formatter) {
    console.log(formatter.format(date, level, category, message));
}

export default {log}