import db from "../db/index.js"

export default (req, res, next) => {
    const auth = req.header("Authorization");
    if (auth?.startsWith("Basic ")) {
        const [email, password] = auth.substring(6, auth.length).split(":");
        const user = db.users.get(email);

        console.log(email, password)

        if(!user || user.password !== password) {
            res.status(404).end("No Access");
        } else {
            req.session = {
                email,
            };
            next();
            return;
        }
    }

    res.status(401).end("Auth header not provided");
}