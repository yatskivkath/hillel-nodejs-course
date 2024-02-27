import * as constants from "./constants.js";
import { validateLogLevel, validateAppender, validateFormat } from "./validators/validateConfig.js";
import fs from "fs";

import dotenv from "dotenv";
dotenv.config();

const defaultConfig = {
    logLevel: constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: constants.appender.CONSOLE,
    format: constants.format.DEFAULT,
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
    
    let fileConfig;
    try {
        fileConfig = readFileConfig(process.env.LOG_CONFIG_FILE);
    } catch (err) {
        console.error(err);
        fileConfig = {};
    }
    

    const logLevel = process.env.LOG_LEVEL?.toUpperCase() ?? fileConfig.logLevel?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase() ?? fileConfig.appender?.toUpperCase();
    const format =  process.env.LOG_FORMAT?.toUpperCase() ?? fileConfig.format?.toUpperCase();
    
    if(validateLogLevel(logLevel)) {
        config.logLevel = logLevel;
    }

    if(validateAppender(appender)) {
        config.appender = appender;
    }

    if(validateFormat(format)) {
        config.format = format;
    }

    enrichConfig(config);

    return config;
}

const config = initConfig();
export default config;