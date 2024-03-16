import urlService from "../services/urlService.js";

function createUrl(req, res) {
    const {url} = req.body;
    const userId = req.session.userId;

    const shortUrl = urlService.createUrl(url, userId);

    res.json(shortUrl);
}

function getUrl(req, res) {
    const { code } = req.params
    
    const shortUrl = urlService.getUrlPublicData(code);
    if(!shortUrl) {
        res.status(404).end("Not Found");
    }

    res.json(shortUrl);
}

function getUrlsByUser(req, res) {
    const userId = req.session.userId;

    const urls = 
        urlService
        .getUrlByUser(userId);

    res.json(urls);
}

export {
    createUrl,
    getUrl,
    getUrlsByUser,
}