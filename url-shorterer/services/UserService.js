
import UserRepository from "../repositories/UserRepository.js";
import UserModel from "../models/UserModel.js";
import {generate} from "../utils/storageGenerators.js";

const sequenceName = "user";

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    create(name, email, password) {
        const user = new UserModel(generate(sequenceName), name, email, password);
        this.userRepository.save(user);

        return {
            ...user,
            password: undefined
        };
    }

    getByEmail(email) {
        return this.userRepository.getUserByEmail(email);
    }

    getUsersPublicData() {
        const users = this.userRepository.getAll();

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

    checkPassword(email, password) {
        if(!email || !password){
            return false;
        }

        const user = this.userRepository.getUserByEmail(email);

        if(!user) {
            return false;
        }

        if (user?.password === password) {
            return true;
        }

        return false;
    }


}