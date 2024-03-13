import express from "express"
import UserController from "./controllers/UserController.js";

const app = express();

app.use(express.json());

app.all("/", (req, res)=>{
    res.send("Works!");
});

app.use("/users", new UserController());

app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).send(err.message);
});

app.listen(3001, () => {
    console.log("Server started");
})