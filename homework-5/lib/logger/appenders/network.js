import * as http from "http";
import * as net from "net";
import { Transform } from "stream";

import config from "../config/config.js";
import * as constants from "../constants.js";
import {eventEmitter } from "../emmiter/emitterStrategy.js";
import { ReadStream } from "./utils/ReadStream.js";
import * as formatterStrategy from "../formatters/formatterStrategy.js"
import { EndineTransformer } from "./utils/EndlineTransformer.js";

const CACHE = []

const formatter = formatterStrategy.getFormatter();

class CacheTransformer extends Transform {
    constructor(options) {
        super(options);
    }

    _transform(chunk, _, next) {
        const logs = chunk.toString("utf8").split('\n');
        logs.pop();
        CACHE.push(...logs);
        next(null, chunk);
    }
}

function createLogsServer() {
    const server = net.createServer();

    server.on("connection", (socket) => {
        socket.pipe(new CacheTransformer);

        socket.on("data", () => {});

        socket.on("error", (err) => { 
            console.error(err);
          }); 
    })

    server.on('error', (err) => { 
        console.error(err)
    }); 

    server.listen(process.env.LOG_NET_PORT, () => {});

    return server
}

function createConnectionServer() {

    const server = http.createServer((req, res) => {
        const {url, method} = req;

        if(method === "GET" && url === "/logs") {
            res.write(JSON.stringify(CACHE));
            res.statusCode = 200;
        } else{
            res.statusCode = 404;
        }

        res.end();
    });

    server.listen(process.env.LOG_HTTP_PORT, process.env.LOG_HOST, () => {});

    return server
}

async function listen() {
    if(config.format === constants.format.CSV) {
        console.trace("Appender does not support this format.");
        return;
    }

    const connectionServer = createConnectionServer();
    const logsServer = createLogsServer();

    const readStream = new ReadStream;

    const client = net.connect({port: process.env.LOG_NET_PORT, host: process.env.LOG_HOST}, () => {
        readStream
            .pipe(new formatter.FormatTransformer)
            .pipe(new EndineTransformer)
            .pipe(client);
    });

    eventEmitter.on("log", (date, level, category, message) => {
        readStream.push({date, level, category, message});
    });
}

export default {listen}