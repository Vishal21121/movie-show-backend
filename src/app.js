import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    // for legacy browsers as they choke on getting 204 for options request hence providing 200
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

export { app };
