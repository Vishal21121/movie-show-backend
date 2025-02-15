import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger/logger.js";

const morganFormat = ":method :url :status :response-time ms";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    // for legacy browsers as they choke on getting 204 for options request hence providing 200
    optionsSuccessStatus: 200,
  })
);

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        console.log("message: ", message);
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(express.json());

export { app };
