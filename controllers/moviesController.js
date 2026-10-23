import fs from "fs";
import mongoose from "mongoose";
let moviesList = JSON.parse(fs.readFileSync("./data/movies.json"));

import Movie from "../models/movieModel.js";

export const checkId = (req, res, next, id) => {
  let movie = moviesList.find((m) => m.id == id);
  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: `movie with id ${id} not found`,
    });
  }

  next();
};

export const checkMovieBody = (req, res, next) => {
  if (!req.body.name || !req.body.year) {
    return res.status(400).json({
      status: "fail",
      message: `Missing required fields: title, director, year`,
    });
  }
  next();
};

export const getMovies =  async(req, res) => {
  try {
    const movies = await mongoose.model("Movie").find();
    res.status(200).json({
      status: "success",
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getMovie = (req, res) => {
  let reqParamId = req.params.id;
  let movie = moviesList.find((m) => m.id == Number(reqParamId));

  res.status(200).json({ ...movie });
};

export const editMovie = (req, res) => {
  let reqParamId = req.params.id;
  let movieToUpdate = moviesList.find((m) => m.id == Number(reqParamId));
  let index = moviesList.indexOf(movieToUpdate);

  moviesList[index] = { ...movieToUpdate, ...req.body };

  fs.writeFile("./data/movies.json", JSON.stringify(moviesList), () => {
    res.send(`movie with id ${reqParamId} has been updated`);
  });
};

export const deleteMovie = (req, res) => {
  let reqParamId = req.params.id;
  let movieToDelete = moviesList.find((m) => m.id == Number(reqParamId));

  let index = moviesList.indexOf(movieToDelete);
  moviesList.splice(index, 1);
  fs.writeFile("./data/movies.json", JSON.stringify(moviesList), () => {
    res.send(`movie with id ${reqParamId} has been deleted`);
  });
};
