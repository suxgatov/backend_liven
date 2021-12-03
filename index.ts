import app from "./src/routes/router";
import config from "./src/config/config";

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});
