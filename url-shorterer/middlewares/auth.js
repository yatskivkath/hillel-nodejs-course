import UserService from "../services/UserService.js";

const userService = new UserService();

export default (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const [email, password] = auth.substring(6, auth.length).split(":");

        const hasAccess = userService.checkPassword(email, password);

        if(!hasAccess) {
            res.status(404).end("No Access");
        } else {
            const user = userService.getByEmail(email);
            req.session = {
                email,
                userId: user.userId,
            };
            next();
            return;
        }
    }

    res.status(401).end("Auth header not provided");
}