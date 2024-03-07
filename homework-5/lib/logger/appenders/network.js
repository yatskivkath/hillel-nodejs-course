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
        super(options);
    }

    _transform(chunk, _, next) {
        console.log(chunk)
        CACHE.push(chunk.toString("utf8"));
        next(null, chunk);
    }
}

function createLogsServer() {
    const server = net.createServer();

    server.on("connection", (socket) => {
        socket.pipe(new CacheTransformer);

        socket.on("data", (data) => {
            console.log(CACHE);
        });

        socket.on("error", (err) => { 
            console.error(err);
          }); 
    })

    server.on('error', (err) => { 
        console.error(err)
      }); 


    return server
}

function createConnectionServer() {

    const server = http.createServer((req, res) => {
        const {url, method, headers} = req;

        res.end(JSON.stringify({url, method, headers}));
    });

    return server
}

async function listen() {
    const connectionServer = createConnectionServer();
    const logsServer = createLogsServer();

    connectionServer.listen(process.env.LOG_HTTP_PORT, process.env.LOG_HOST, () => {
        console.log("connectionServer connection established");
    });

    logsServer.listen(process.env.LOG_NET_PORT, () => {
        console.log("logsServer connection established");
    });

    const readStream = new ReadStream;

    const client = net.connect({port: process.env.LOG_NET_PORT, host: process.env.LOG_HOST}, () => {
        console.log("Connected");
        readStream.pipe(new formatter.FormatTransformer).pipe(client);
        // readStream.push({date: "today", message: "lorem"});
        // readStream.push({date: "today", message: "lorem2"});
        // readStream.push({date: "today", message: "lorem3"});
        // readStream.push({date: "today", message: "lorem4"});
        // readStream.push({date: "today", message: "lorem5"});
        // readStream.push({date: "today", message: "lorem6"});
    });

    eventEmitter.on("log", (date, level, category, message) => {
        console.log("log")
    });
}

export default {listen}