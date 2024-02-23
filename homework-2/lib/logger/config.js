import * as constants from "./constants.js";
import { validateLogLevel, validateAppender } from "./validators/validateConfig.js";

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

function initConfig() {
    const config = defaultConfig;

    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase();

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