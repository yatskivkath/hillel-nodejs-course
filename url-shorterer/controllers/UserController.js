import userService from "../services/userService.js";

async function getAllUsers(req, res) {
    const users = await userService.getUsersPublicData();
    res.json(users);
}

async function createUser (req, res) {
    const {name, email, password} = req.body;
    const user = await userService.createUser(name, email, password);
    res.json(user);
}

export {
    createUser,
    getAllUsers,
}