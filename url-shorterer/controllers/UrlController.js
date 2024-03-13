import UrlService from "../services/UrlService.js";

const urlService = new UrlService();

function createUrl(req, res) {
    const {url} = req.body;
    const userId = req.session.userId;

    const shortUrl = urlService.create(url, userId);

    res.json(shortUrl);
}

function getUrl(req, res) {
    const { code } = req.params
    
    const shortUrl = urlService.getUrlPublicData(code);

    res.json(shortUrl);
}

export {
    createUrl,
    getUrl,
}