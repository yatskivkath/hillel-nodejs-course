const urls = new Map();

export default class UrlRepository {
    save(url) {
        urls.set(url.code, url);
    }

    get(code) {
        return urls.get(code);
    }

    update(code, url) {
        urls.set(code, url);
        return urls.get(code);
    }
}