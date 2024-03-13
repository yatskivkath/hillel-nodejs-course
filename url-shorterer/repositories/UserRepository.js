const users = new Map();

users.set("0", {userId: "0", name: "Kateryna Yatskiv", email: "test@mail.com", password: "admin"});

export default class UserRepository {
    save(user) {
        users.set(user.userId, user);
    }

    get(userId) {
        return users.get(userId);
    }

    getByEmail(email) {
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