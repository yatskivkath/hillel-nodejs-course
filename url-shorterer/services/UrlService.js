import UrlRepository from "../repositories/UrlRepository.js";
import UrlModel from "../models/UrlModel.js";

export default class UrlService {
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    create(redirectUrl, userEmail) {
        const url =  new UrlModel(redirectUrl, userEmail);
        this.urlRepository.save(url);

        return url;
    }

    get(code) {
        const url = this.urlRepository.get(code);

        return url;
    }

    visit(code) {
        const url = this.urlRepository.get(code);
        this.urlRepository.update(code, {
            ...url,
            visit: url.visit + 1,
        })
    }


}