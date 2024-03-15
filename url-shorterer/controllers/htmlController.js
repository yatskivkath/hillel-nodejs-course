import urlService from "../services/urlService.js";
import userService from "../services/userService.js"

function getUsersView(req, res) {
    const users = userService.getUsersPublicData();
    
    res.render("users.ejs", { users: users });
}

function getUrlsView(req, res) {
    const userId = req.session.userId;
    const urls = urlService.getUrlByUser(userId);

    res.render("urls.ejs", {urls})
}

export {
    getUrlsView,
    getUsersView,
}