import userService from "../services/userService.js";

function getAllUsers(req, res) {
    const users = userService.getUsersPublicData();

    res.json(users);
}

function createUser (req, res) {
    const {name, email, password} = req.body;
    const user = userService.createUser(name, email, password);

    res.json(user);
}

export {
    createUser,
    getAllUsers,
}