import urlService from "../services/urlService.js";

async function createUrl(req, res) {
    const {url} = req.body;
    const user_id = req.session.user_id;

    const shortUrl = await urlService.createUrl(url, user_id);

    res.json(shortUrl);
}

async function getUrl(req, res) {
    const { code } = req.params
    
    const shortUrl = await urlService.getUrlPublicData(code);
    if(!shortUrl) {
        res.status(404).end("Not Found");
    }

    res.json(shortUrl);
}

async function getUrlsByUser(req, res) {
    const user_id = req.session.user_id;

    const urls = await urlService.getUrlByUser(user_id);

    res.json(urls);
}

export {
    createUrl,
    getUrl,
    getUrlsByUser,
}