import { BASE_URL } from "../constants.js";
import urlService from "../services/urlService.js";
import userService from "../services/userService.js"

function getUsersView(req, res) {
    const users = userService.getUsersPublicData();
    
    res.render("users.ejs", { users: users });
}

function getUrlsView(req, res) {
    res.render("urls.ejs")
}

export {
    getUrlsView,
    getUsersView,
}