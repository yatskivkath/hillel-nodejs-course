import userService from "../services/userService.js";

export default (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const [email, password] = auth.substring(6, auth.length).split(":");

        const hasAccess = userService.checkPassword(email, password);

        if(!hasAccess) {
            res.status(404).end("No Access");
        } else {
            const user = userService.getUserByEmail(email);

            req.session.userId = user.userId;
            req.session.email = email;
            return next();
        }
    }

    res.status(401).end("Auth header not provided");
}