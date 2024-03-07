import * as http from "http";
import * as net from "net";
import { Transform } from "stream";

import {eventEmitter } from "../emmiter/emitterStrategy.js";
import { ReadStream } from "./utils/ReadStream.js";
import * as formatterStrategy from "../formatters/formatterStrategy.js"

const CACHE = []

const formatter = formatterStrategy.getFormatter();

class CacheTransformer extends Transform {
    constructor(options) {
        super({
            ...options,
            objectMode: true,
        });
    }

    _transform(chunk, _, next) {
        CACHE.push(chunk);
        next(null, chunk);
    }
}

function createLogsServer() {
    const server = net.createServer();

    server.on("data", (data) => {
        console.log(data)
    })

    server.on("connection", (socket) =>{
        console.log(socket.remoteAddress + ":" + socket.remotePort);

        socket.end();
    })

    return server
}

function createConnectionServer() {

    const server = http.createServer((req, res) => {
        const {url, method, headers} = req;

        res.end(JSON.stringify({url, method, headers}));
    });


    return server
}

function listen() {
    const connectionServer = createConnectionServer();
    const logsServer = createLogsServer();

    connectionServer.listen(process.env.LOG_HTTP_PORT, process.env.LOG_HOST, () => {
        console.log("connectionServer connection established");
    });

    logsServer.listen(process.env.LOG_NET_PORT, () => {
        console.log("logsServer connection established");
    });

    const client = net.connect({port: process.env.LOG_NET_PORT, host: process.env.LOG_HOST}, () => {
        console.log("Connected");
        client.write("hello from client")
    });

    eventEmitter.on("log", (date, level, category, message) => {
        console.log("log")
        client.write(`${date} ${level}`);
    });
}

export default {listen}