import * as db from "../db/index.js";
import { validateUser } from "../db/users/validators.js";

const createUser = (req, res) => {
    const { name, email, password } = req.body;

    if(!validateUser({name, email, password})) {
        throw new Error ("Incorrect data");
    }

    db.users.add({name, email, password});
    
    res.status(201).json({name, email, password});
}

export {
    createUser,
}