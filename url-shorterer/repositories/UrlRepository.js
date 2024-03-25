import pgClient from "../postgres/client.js"

export default class UrlRepository {
    async save(url) {
        const newUrl = await pgClient.query("INSERT INTO urls (code, url, user_id) VALUES ($1, $2, $3)", [url.code, url.url, url.user_id]);
        return newUrl;
    }

    async get(code) {
        const url = await pgClient.query("SELECT * FROM urls WHERE code=$1", [code]);
        return url.rows?.[0] ?? null;
    }

    async getAll() {
        const urls = await pgClient.query("SELECT * FROM urls");
        return urls.rows;
    }

    async updateVisits(code, visits) {
        const url = await pgClient.query("UPDATE urls SET visits=$1 WHERE code=$2", [visits, code]);
        return url;
    }
}