import express from "express";
import config from "./src/config/config";

const app = express();

app.use(express.json());

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});
