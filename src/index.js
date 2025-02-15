import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
