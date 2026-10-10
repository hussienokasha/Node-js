import express from "express";
import morgan from "morgan";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/movies", movieRoutes);

export default app;
