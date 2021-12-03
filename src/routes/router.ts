import express from "express";

import userRouter from "../routes/users/users.router";
import addressRouter from "../routes/address/address.router";
import authRouter from "../routes/auth/auth.router";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/address", addressRouter);
app.use("/auth", authRouter);

export default app;
