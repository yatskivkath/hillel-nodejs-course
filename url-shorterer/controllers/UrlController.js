import UrlService from "../services/UrlService.js";

const urlService = new UrlService();

function createUrl(req, res) {
    const {url} = req.body;
    const userEmail = req.session.email;

    const shortUrl = urlService.create(url, userEmail);

    res.json(shortUrl);
}

function getUrl(req, res) {
    const { code } = req.params
    
    const shortUrl = urlService.get(code);

    res.json(shortUrl);
}

export {
    createUrl,
    getUrl,
}