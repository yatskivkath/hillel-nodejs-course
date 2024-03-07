import urls from "./urls.js";
import {generateHash} from "../../utils/hashFunctions.js"
import UserServices from "../users/services.js";

function create({url, userEmail}) {
    const code = generateHash();

    const user = UserServices.get(userEmail);

    urls.push({
        code,
        url,
        visits: 0,
        createdAt: Date.now(),
        user: user,
    });

    return code
}

function get({code}) {
    return urls.find(u => u.code === code);
}

function visit({code}) {
    const url = get({code});
    url.visits++;
}

export default {
    create,
    get,
    visit,
}