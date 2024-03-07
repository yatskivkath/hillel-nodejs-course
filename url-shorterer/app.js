import express from "express"
import userRouter from "./routes/user.js";
import codeRouter from "./routes/code.js";
import urlRouter from "./routes/url.js"

const app = express();

app.use("/user", userRouter);
app.use("/code", codeRouter);
app.use("/url", urlRouter);

app.listen(3001, () => {
    console.log("Server Started");
})