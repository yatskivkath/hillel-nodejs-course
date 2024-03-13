const users = new Map();

users.set("1", {userId: "userId", name: "qwe", email: "qwe@com", password: "qwe"});

export default class UserRepository {
    save(user) {
        users.set(user.userId, user);
    }

    get(userId) {
        return users.get(userId);
    }

    getUserByEmail(email) {
        for (let user of users.values()) {
            if (user.email === email) {
                return user;
            }
        }

        return null;
    }

    getAll() {
        return users.values();
    }
}