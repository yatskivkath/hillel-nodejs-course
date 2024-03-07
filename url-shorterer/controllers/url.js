import { generateHash } from "../utils/hashFunctions.js";
import * as constants from "../constants.js";

const createUrl = (req, res) => {
    const {url} = req.body;
    const hash = generateHash();

    res.status(201).json({
        shortUrl: `${constants.BASE_URL}${hash}`
    })
}

const readUrl = (req, res) => {
    const {code} = req.params;

    res.status(200).json({
        //data
    })
}

export {
    createUrl,
    readUrl,
}

