import UrlRepository from "../repositories/UrlRepository.js";
import UrlModel from "../models/UrlModel.js";

export default class UrlService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    create(redirectUrl, userId) {
        const url =  new UrlModel(redirectUrl, userId);
        this.urlRepository.save(url);

        return url;
    }

    get(code) {
        return this.urlRepository.get(code);
    }

    getUrlPublicData(code) {
        const url = this.urlRepository.get(code);

        return {
            ...url,
            userId: undefined
        }
    }

    visit(code) {
        const url = this.urlRepository.get(code);
        this.urlRepository.update(code, {
            ...url,
            visit: url.visit + 1,
        })
    }


}