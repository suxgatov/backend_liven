import express from "express";
import config from "./src/config/config";

import userRouter from "./src/routes/users/users.router";
import addressRouter from "./src/routes/address/address.router";
import authRouter from "./src/routes/auth/auth.router";

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/address", addressRouter);
app.use("/auth", authRouter);

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});
