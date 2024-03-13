import {Router} from "express";
import UserService from "../services/UserService.js";

export default class UserController extends Router {
    constructor() {
        super();
        this.userService = new UserService();

        this.init()
    }

    init = ()=> {
        this.get("/all", (req, res) => {
            const users = this.userService.getUsersPublicData();

            res.json(users);
        });

        this.post("/create", (req, res) => {
            const {name, email, password} = req.body;
            const user = this.userService.create(name, email, password);

            res.json(user);
        })
    }


}