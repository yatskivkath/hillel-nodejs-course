import userService from "../services/userService.js";

export default async (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const [email, password] = auth.substring(6, auth.length).split(":");

        const hasAccess = await userService.checkPassword(email, password);

        if(!hasAccess) {
            res.status(404).end("No Access");
        } else {
            const user = await userService.getUserByEmail(email);

            req.session.user_id = user.user_id;
            req.session.email = email;
            return next();
        }
    }

    res.status(401).end("Auth header not provided");
}