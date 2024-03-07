function validateUser(user) {
    if(!user.name || typeof user.name !== "string") {
        return false;
    }

    // TODO: regEx
    if(!user.email || typeof user.email !== "string") {
        return false;
    }

    if(!user.password || typeof user.password !== "string") {
        return false;
    }

    return true;
}

export {
    validateUser,
}