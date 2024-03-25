export default class UserModel{
    user_id;
    name;
    password;
    email;

    constructor(user_id, name, email, password) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

}