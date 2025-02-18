import { app } from "./app.js";
import dotenv from "dotenv";
import { connectToDB } from "./db/dbConnect.js";
import logger from "./logger/logger.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

connectToDB()
  .then((result) => {
    if (result) {
      app.listen(port, () => logger.info(`listening at port ${port}`));
    } else {
      process.exit(1);
    }
  })
  .catch((error) => {
    logger.error("Error connecting to database");
    process.exit(1);
  });
