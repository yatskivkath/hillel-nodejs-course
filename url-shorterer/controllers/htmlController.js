import { BASE_URL } from "../constants.js";
import urlService from "../services/urlService.js";
import userService from "../services/userService.js"

function getUsersView(req, res) {
    const users = userService.getUsersPublicData();
    
    res.render("users", { users: users });
}

function getUrlsView(req, res) {
    res.render("urls")
}

export {
    getUrlsView,
    getUsersView,
}