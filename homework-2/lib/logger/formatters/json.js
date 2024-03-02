function format(date, level, category, message) {
    return JSON.stringify({
        date,
        level,
        category,
        message,
    });
}

export default {format}