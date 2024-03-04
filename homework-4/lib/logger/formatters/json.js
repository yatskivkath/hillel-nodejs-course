import {Transform} from "stream";

const format = new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
        const {date, level, category, message} = chunk;
        callback(null, JSON.stringify({ date, level, category, message }));
    }
})

process.on('exit', () => format.destroy());
process.on('SIGINT', () => format.destroy());
process.on('SIGUSR1', () => format.destroy());
process.on('SIGUSR2', () => format.destroy());
process.on('uncaughtException', () => format.destroy());

export default {format}