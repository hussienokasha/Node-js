import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Movie name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Movie description is required"],
  },
  year: {
    type: Number,
    required: [true, "Movie release year is required"],
  },
  rating: {
    type: Number,
    min: [0, "Rating must be at least 0"],
    max: [10, "Rating cannot exceed 10"],
    default: 1.0,
  },
});
const movieModel = mongoose.model("Movie", movieSchema);

export default movieModel;
