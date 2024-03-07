import users from "./users.js";

function create(user) {
    if(get(user.email)) {
        throw new Error ("User already exists")
    }
    
    users.push({
        ...user,
        createdAt: Date.now(),
    });
}

function get(email) {
    return users.find((u) => u.email === email);
}

export default {
    create,
    get,
}