import express from "express";
import morgan from "morgan";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"));
}

app.use("/movies", movieRoutes);

export default app;
