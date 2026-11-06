import fs from 'fs'
import Movie from '../models/movieModel.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config({path:'./config.env'})


mongoose
  .connect(process.env.CONN_STR)
  .then(() => {
    console.log("connection to remote DB established successfully");
  })
  .catch((error) => {
    console.log(error);
  });


async function importMoviesData() {
  try {
    const movies = JSON.parse(
      fs.readFileSync('./data/movies.json', 'utf8')
    );

    await Movie.create(movies);

    console.log('Movies imported successfully');
  } catch (e) {
    console.error(e.message);
  }
  process.exit()
}

async function deleteMovies() {
  try {
    await Movie.deleteMany({});

    console.log('Movies deleted successfully');
  } catch (e) {
    console.error(e.message);
  }
  process.exit()
}
if(process.argv[2] == '--import'){
  importMoviesData()
}
if(process.argv[2] == '--delete'){
  deleteMovies()
}
