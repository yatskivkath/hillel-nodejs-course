const urls = new Map();

export default class UrlRepository {
    save(url) {
        urls.set(url.code, url);
    }

    get(code) {
        return urls.get(code);
    }

    getAll() {
        return urls.values();
    }

    update(code, url) {
        urls.set(code, url);
        return urls.get(code);
    }
}