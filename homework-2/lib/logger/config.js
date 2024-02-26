import * as constants from "./constants.js";
import { validateLogLevel, validateAppender } from "./validators/validateConfig.js";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel]
}

function readFileConfig(path) {
    if(!path) return {}

    const fileConfig = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
    return fileConfig ?? {};
}

function initConfig() {
    const config = defaultConfig;
    
    const fileConfig = readFileConfig(process.env.LOG_CONFIG_FILE);

    const logLevel = process.env.LOG_LEVEL?.toUpperCase() ?? fileConfig.logLevel?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase() ?? fileConfig.appender?.toUpperCase();
    
    if(validateLogLevel(logLevel)){
        config.logLevel = logLevel
    }

    if(validateAppender(appender)){
        config.appender = appender
    }

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;