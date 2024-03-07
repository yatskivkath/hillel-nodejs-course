import * as constants from "../constants.js";
import db from "../db/index.js";

const createUrl = (req, res) => {
    const {url} = req.body;
    const {email} = req.session.email;

    const hash = db.urls.create({url, email});

    res.status(201).json({
        shortUrl: `${constants.BASE_URL}${hash}`
    })
}

const readUrl = (req, res) => {
    const {code} = req.params;

    const url = db.urls.get({code});
    db.urls.visit({code});

    res.status(200).json(url);
}

export {
    createUrl,
    readUrl,
}

