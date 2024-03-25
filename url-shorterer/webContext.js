import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import dotenv from "dotenv";

import redisClient from "./redis/redisClient.js";
import userRouter from "./routes/user.js";
import codeRouter from "./routes/code.js";
import urlRouter from "./routes/url.js";
import htmlRouter from "./routes/html.js";

dotenv.config();

function initMiddlewares(app){
    app.use(express.json());

    app.use(cookieParser());
    app.use(session({
        store: new RedisStore({
            client: redisClient, ttl: 86400
        }),
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: true,
        name: "sessionId",
        cookie: {
            httpOnly: true,
            domain: "127.0.0.1",
        }
    }));
}

function initControllers(app){
    app.all("/", (req, res)=>{
        res.send("Works!");
    });

    app.use("/users", userRouter);
    app.use("/urls", urlRouter);
    app.use("/code", codeRouter);
    app.use("/html", htmlRouter);

}

function initViews(app){
    app.set("views", "views");
    app.set("view engine", "ejs");

}

// TODO: Import logger and error handling
function initErrorHandling(app){
    app.use((err, req, res, next) => {
        console.log(err);

        res.status(500).send(err.message);
    });
}

export default function (app){
    initMiddlewares(app);
    initViews(app);
    initControllers(app);
    initErrorHandling(app);
}