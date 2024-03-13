import urlService from "../services/urlService.js";

function redirectByCode(req, res) {
    const { code } = req.params;

    const shortUrl = urlService.getUrl(code);

    if(!shortUrl) {
        res.status(404).end("Not Found");
    }

    urlService.visitUrl(code);
    res.redirect(301, shortUrl.url);
}

export {
    redirectByCode,
}