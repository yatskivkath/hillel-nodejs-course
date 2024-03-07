import users from "./users.js";
import { validateUser } from "./validators.js";

function add(user) {
    users.push(user);
    console.log(users);
}

function get(email) {
    return users.find((u) => u.email === email);
}

export {
    add,
    get,
}