import {
  deleteMovie,
  getMovie,
  editMovie,
  createMovie,
  getMovies,
  checkId,
 
} from "../controllers/moviesController.js";

import express from "express";

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getMovies).post(createMovie);

router.route("/:id").get(getMovie).patch(editMovie).delete(deleteMovie);

export default router;
