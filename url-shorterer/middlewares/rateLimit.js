import rateLimitService from "../services/RateLimitService.js"
import urlService from "../services/urlService.js";

async function rateLimitByCode (req, res, next) {
    const {code} = req.params;

    const isPassed = await rateLimitService.checkRateLimitCode(code);

    if (isPassed) {
        return next();
    } else {
        res.status(429).end("Rate Limit");
    }
}

async function rateLimitByUser (req, res, next) {
    const {code} = req.params;
    const {userId} = urlService.getUrl(code);

    const isPassed = await rateLimitService.checkRateLimitUser(userId);

    if (isPassed) {
        return next();
    } else {
        res.status(429).end("Rate Limit");
    }
}

export {
    rateLimitByCode,
    rateLimitByUser,
}