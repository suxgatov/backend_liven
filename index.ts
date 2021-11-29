import express from "express";
import config from "./src/config/config";

import userRouter from "./src/routes/users/users.router";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});
