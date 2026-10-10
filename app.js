import express from "express";

import movieRoutes from "./routes/movieRoutes.js";

const app = express();

app.use(express.json());

app.use("/movies", movieRoutes);

export default app;
