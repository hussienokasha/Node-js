import fs from "fs";

let moviesList = JSON.parse(fs.readFileSync("./data/movies.json"));

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
    if (!req.body.name || !req.body.year ) {
      return res.status(400).json({
        status: "fail",
        message: `Missing required fields: title, director, year`,
      });
    }
    next();
  };

export const getMovies = (req, res) => {
  res.json(moviesList);
};

export const createMovie = (req, res) => {
  const newId = moviesList[moviesList.length - 1].id + 1;
  const newMovie = req.body;
  moviesList.push({ id: newId, ...newMovie });
  fs.writeFile("./data/movies.json", JSON.stringify(moviesList), () => {
    res.status(201).send("New movie created");
  });
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
