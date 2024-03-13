import UserService from "../services/UserService.js";

const userService = new UserService();

function getAllUsers(req, res) {
    const users = userService.getUsersPublicData();

    res.json(users);
}

function createUser (req, res) {
    const {name, email, password} = req.body;
    const user = userService.create(name, email, password);

    res.json(user);
}

export {
    createUser,
    getAllUsers,
}