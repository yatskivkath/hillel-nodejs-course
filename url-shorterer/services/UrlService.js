import UrlRepository from "../repositories/UrlRepository.js";
import UrlModel from "../models/UrlModel.js";
import { BASE_URL } from "../constants.js";

const urlRepository = new UrlRepository();

async function createUrl(redirectUrl, user_id) {
    const url =  new UrlModel(redirectUrl, user_id);
    await urlRepository.save(url);

    return url;
}

async function getUrl(code) {
    return await urlRepository.get(code);
}

async function getUrlPublicData(code) {
    const url = await urlRepository.get(code);

    return {
        shortUrl: `${BASE_URL}${url.code}`,
        url: url.url,
        visits: url.visits,
    }
}

async function getUrlByUser(user_id) {
    const urls = await urlRepository.getAll();

    const result = [];
    for (const url of urls) {
        if(url.user_id == user_id) {
            result.push({
                shortUrl: `${BASE_URL}${url.code}`,
                url: url.url,
                visits: url.visits,
            })
        }
    }

    return result;
}

async function visitUrl(code) {
    const url = await urlRepository.get(code);
    if(!url) {
        throw new Error("Url was not found")
    }
    
    await urlRepository.updateVisits(code, url.visits + 1);
}

export default {
    createUrl,
    getUrl, 
    getUrlPublicData,
    visitUrl,
    getUrlByUser,
}