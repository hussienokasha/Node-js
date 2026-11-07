import Movie from "../models/movieModel.js";

import APIFeatures from "../utils/ApiFeatures.js";
export const checkId = async (req, res, next, id) => {
  try {
    await Movie.findById({ _id: req.params.id });
  } catch (err) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  next();
};

export const getMostRated = (req, res, next) => {
  Object.defineProperty(req, "query", {
    value: { ...req.query, sort: "-rating" },
    writable: true,
    configurable: true,
    enumerable: true,
  });

  next();
};

export const getMovies = async (req, res) => {
  try {
    const features = new APIFeatures(Movie.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const movies = await features.query;

    res.status(200).json({
      status: "success",
      length: movies.length,
      data: {
        movies,
      },
    });
  } catch (err) {
    res.status(404).json({
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

export const getMovie = async (req, res) => {
  let reqParamId = req.params.id;
  try {
    let movie = await Movie.findById({ _id: reqParamId });

    if (!movie) {
      return res.status(404).json({
        status: "fail",
        message: "Movie not found",
      });
    }

    res.status(200).json({
      status: "success",
      movie,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const editMovie = async (req, res) => {
  let reqParamId = req.params.id;
  try {
    let movie = await Movie.findByIdAndUpdate(reqParamId, req.body, {
      returnDocument: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        movie,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  let reqParamId = req.params.id;
  try {
    await Movie.findByIdAndDelete(reqParamId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
