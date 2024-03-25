import urlService from "../services/urlService.js";

async function redirectByCode(req, res) {
    const { code } = req.params;

    const shortUrl = await urlService.getUrl(code);

    if(!shortUrl?.url) {
        res.status(404).end("Not Found");
    }

    await urlService.visitUrl(code);
    res.redirect(302, shortUrl.url);
}

export {
    redirectByCode,
}