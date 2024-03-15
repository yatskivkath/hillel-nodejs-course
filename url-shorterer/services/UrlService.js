import UrlRepository from "../repositories/UrlRepository.js";
import UrlModel from "../models/UrlModel.js";
import { BASE_URL } from "../constants.js";

const urlRepository = new UrlRepository();

function createUrl(redirectUrl, userId) {
    const url =  new UrlModel(redirectUrl, userId);
    urlRepository.save(url);

    return url;
}

function getUrl(code) {
    return urlRepository.get(code);
}

function getUrlPublicData(code) {
    const url = urlRepository.get(code);

    return {
        shortUrl: `${BASE_URL}${url.code}`,
        url: url.url,
        visits: url.visits,
    }
}

function getUrlByUser(userId) {
    const urls = urlRepository.getAll();

    return urls.filter((url) => url.userId === userId);
}

function visitUrl(code) {
    const url = urlRepository.get(code);
    url.visits++;
    urlRepository.update(code, url)
}

export default {
    createUrl,
    getUrl, 
    getUrlPublicData,
    visitUrl,
    getUrlByUser,
}