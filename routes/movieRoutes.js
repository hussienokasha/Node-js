import {
  deleteMovie,
  getMovie,
  editMovie,
  createMovie,
  getMovies,
  checkId,
  checkMovieBody
} from "../controllers/moviesController.js";

import express from "express";

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getMovies).post(checkMovieBody,createMovie);

router.route("/:id").get(getMovie).patch(editMovie).delete(deleteMovie);

export default router;
