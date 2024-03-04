import {Transform} from "stream";

const endlineAppender = new Transform({
    transform(chunk, _, callback) {
        callback(null, chunk + '\n');
    }
});

process.on('exit', () => endlineAppender.destroy());
process.on('SIGINT', () => endlineAppender.destroy());
process.on('SIGUSR1', () => endlineAppender.destroy());
process.on('SIGUSR2', () => endlineAppender.destroy());
process.on('uncaughtException', () => format.destroy());

export {endlineAppender}