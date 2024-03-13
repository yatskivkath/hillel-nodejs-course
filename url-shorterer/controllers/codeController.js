import UrlService from "../services/UrlService.js";

const urlService = new UrlService();

function redirectByCode(req, res) {
    const { code } = req.params;

    const shortUrl = urlService.get(code);

    if(!shortUrl) {
        res.status(404).end("Not Found");
    }

    res.redirect(301, shortUrl.url);
}

export {
    redirectByCode,
}