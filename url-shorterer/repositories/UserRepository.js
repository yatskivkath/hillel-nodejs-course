import pgClient from "../postgres/client.js"

export default class UserRepository {
    async save(user) {
        const newUser = await pgClient.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [user.name, user.email, user.password]);
        return newUser;
    }

    async get(user_id) {
        const user = await pgClient.query("SELECT * FROM users WHERE id=$1", [user_id]);
        return user.rows?.[0] ?? null;
    }

    async getByEmail(email) {
        const user = await pgClient.query("SELECT * FROM users WHERE email=$1", [email]);
        return user.rows?.[0] ?? null;
    }

    async getAll() {
        const users = await pgClient.query("SELECT * FROM users");
        return users.rows;
    }
}