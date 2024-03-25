import { generateHash } from "../utils/hashFunctions.js";

export default class UrlModel{
    code;
    url;
    visits = 0;
    createdAt = Date.now();
    user_id;

    constructor(url, user_id) {
        this.url = url;
        this.code = generateHash();
        this.user_id = user_id;
    }

}