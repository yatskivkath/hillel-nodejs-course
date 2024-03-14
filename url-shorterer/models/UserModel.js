export default class UserModel{
    userId;
    name;
    password;
    email;

    constructor(userId, name, email, password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}