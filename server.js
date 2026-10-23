import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./app.js";

import mongoose from "mongoose";

mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("connection to remote DB established successfully");
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server hosted on port " + port);
});
