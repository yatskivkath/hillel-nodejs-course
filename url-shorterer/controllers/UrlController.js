import {Router} from "express";
import UrlService from "../services/UrlService.js";

export default class UserController extends Router {
    constructor() {
        super();
        this.urlService = new UrlService();

        this.init()
    }

    init = ()=> {
        this.post("/create", (req, res) => {
            const {name, email, password} = req.body;
            const user = this.userService.create(name, email, password);

            res.json(user);
        })
    }


}