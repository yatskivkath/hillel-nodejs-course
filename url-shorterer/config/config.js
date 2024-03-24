import fs from "fs";

const REQUESTS_LIMIT_PER_CODE = 1000;
const TIME_LIMIT_PER_CODE = 3600;
const REQUESTS_LIMIT_PER_USER = 1000;
const TIME_LIMIT_PER_USER = 3600;

const defaultConfig = {
    requestsLimitPerCode: REQUESTS_LIMIT_PER_CODE,
    requestsLimitPerUser: REQUESTS_LIMIT_PER_USER,
    timelimitPerCode: TIME_LIMIT_PER_CODE,
    timeLimitPerUser: TIME_LIMIT_PER_USER,
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
    
    const requestsLimitPerCode = parseInt(
        process.env.RATE_LIMIT_REQUESTS_PER_CODE ?? 
        fileConfig.requestsLimitPerCode ?? 
        defaultConfig.requestsLimitPerCode);
    const timeLimiPerCode = parseInt(
        process.env.RATE_LIMIT_TIME_PER_CODE ??
        fileConfig.timelimitPerCode ??
        defaultConfig.timelimitPerCode);
    const requestsLimitPerUser = parseInt(
        process.env.RATE_LIMIT_REQUESTS_PER_USER ?? 
        fileConfig.requestsLimitPerUser ?? 
        defaultConfig.requestsLimitPerUser);
    const timeLimiPerUser = parseInt(
        process.env.RATE_LIMIT_TIME_PER_USER ??
        fileConfig.timelimitPerUser ??
        defaultConfig.timeLimitPerUser);

    return {
        requestsLimitPerCode,
        timeLimiPerCode,
        requestsLimitPerUser,
        timeLimiPerUser,
    };
}

const config = initConfig();

export default config;