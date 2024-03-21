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
    const url = urlService.getUrl(code);

    if(!url) {
        res.status(404).end("Not Found");
    }

    const isPassed = await rateLimitService.checkRateLimitUser(url?.userId);

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