
import UserRepository from "../repositories/UserRepository.js";
import UserModel from "../models/UserModel.js";
import {generate} from "../utils/storageGenerators.js";

const sequenceName = "user";

const userRepository = new UserRepository();

function createUser(name, email, password) {
    const user = new UserModel(generate(sequenceName), name, email, password);
    userRepository.save(user);

    return {
        ...user,
        password: undefined
    };
}

function getUserByEmail(email) {
    return userRepository.getByEmail(email);
}

function getUsersPublicData() {
    const users = userRepository.getAll();

    const result = [];
    for (const user of users) {
        result.push({
            id: user.userId,
            name: user.name,
            email: user.email,
        })
    }

    return result;
}

function checkPassword(email, password) {
    if(!email || !password){
        return false;
    }

    const user = userRepository.getByEmail(email);

    if(!user) {
        return false;
    }

    if (user?.password === password) {
        return true;
    }

    return false;
}

export default {
    createUser,
    getUserByEmail,
    getUsersPublicData,
    checkPassword
}
