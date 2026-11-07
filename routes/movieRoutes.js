import {
  deleteMovie,
  getMovie,
  editMovie,
  createMovie,
  getMovies,
  checkId,
  getMostRated,
  getMovieStats,
} from "../controllers/moviesController.js";

import express from "express";

const router = express.Router();

router.param("id", checkId);

router.route("/most-rated").get(getMostRated, getMovies);
router.route("/stats").get(getMovieStats);

router.route("/").get(getMovies).post(createMovie);

router.route("/:id").get(getMovie).patch(editMovie).delete(deleteMovie);

export default router;
