import fs from "fs";

const REQUESTS_LIMIT = 1000;
const TIME_LIMIT = 3600;

const defaultConfig = {
    requestsLimit: REQUESTS_LIMIT,
    timeLimit: TIME_LIMIT,
}

function readFileConfig(path) {
    if(!path) return {}

    const fileConfig = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }));
    return fileConfig ?? {};
}

function initConfig() {
    let fileConfig;
    try {
        fileConfig = readFileConfig(process.env.RATE_LIMIT_CONFIG_FILE);
    } catch (err) {
        console.error(err);
        fileConfig = {};
    }
    
    const requestsLimit = process.env.RATE_LIMIT_REQUESTS ?? fileConfig.requestsLimit ?? defaultConfig.requestsLimit;
    const timeLimit = process.env.RATE_LIMIT_TIME ?? fileConfig.timeLimit ?? defaultConfig.timeLimit;

    return {
        requestsLimit,
        timeLimit,
    };
}

const config = initConfig();

export default config;