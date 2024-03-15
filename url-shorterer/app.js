import express from "express"
import userRouter from "./routes/user.js";
import codeRouter from "./routes/code.js";
import urlRouter from "./routes/url.js"

const app = express();

app.use(express.json());

app.all("/", (req, res)=>{
    res.send("Works!");
});

app.set("views", "views");
app.set("view engine", "ejs");

app.use("/users", userRouter);
app.use("/urls", urlRouter);
app.use("/code", codeRouter);

app.use((err, req, res, next) => {
    console.log(err);

    res.status(500).send(err.message);
});

app.listen(3001, () => {
    console.log("Server started");
})