import redisClient from "../redis/redisClient.js";
import config from "../config/config.js";

async function checkRateLimit(key, limit, expires) {
    const rates = await redisClient.get(key);
    

    if(!rates) {
        await redisClient.set(key, 1, {
            EX: expires,
        });
        return true;
    } else if(rates < limit) {
        await redisClient.incr(key);
        return true;
    } else {
        return false;
    }

    
}

async function checkRateLimitCode(code) {
    const key = `rl:code:${code}`;
    return await checkRateLimit(key, config.requestsLimitPerCode, config.timeLimiPerCode);
}

async function checkRateLimitUser(user_id) {
    const key = `rl:user:${user_id}`;
    return await checkRateLimit(key, config.requestsLimitPerUser, config.timeLimiPerUser);
}

export default {
    checkRateLimitCode,
    checkRateLimitUser,
}