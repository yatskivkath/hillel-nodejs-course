import redisClient from "../redis/redisClient.js";

async function checkRateLimit(key, limit, expires) {
    const rates = await redisClient.get(key);

    if(!rates) {
        await redisClient.set(key, 1);
        await redisClient.expire(key, expires);
        return true;
    }

    if(rates < limit) {
        await redisClient.incr(key);
        return true;
    } else {
        return false;
    }
}

async function checkRateLimitCode(code) {
    const key = `rl:code${code}`;
    return await checkRateLimit(key, 3, 60);
}

async function checkRateLimitUser(userId) {
    const key = `rl:user${userId}`;
    return await checkRateLimit(key, 3, 60);
}

export default {
    checkRateLimitCode,
    checkRateLimitUser,
}