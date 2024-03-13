import { generateHash } from "../utils/hashFunctions.js";

export default class UrlModel{
    code;
    url;
    visits = 0;
    createdAt = Date.now();
    userId;

    constructor(url, userEmail) {
        this.url = url;
        this.code = generateHash();

        this.userId = UserRepository; // changes
    }

}