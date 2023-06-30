const express = require("express");
const routers = express.Router();
const Movie = require("../../models/Movie");
const uploader = require("../../middlewares/uploader");
const {
  getAllMovie,
  movieCreate,
  getByMovieId,
  movieUpdateById,
  movieDelete,
} = require("./movie.controllers");
const passport = require("passport");
routers.param("movieId", async (req, res, next, movieId) => {
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      res.status(404).json(message.error);
    }
    req.movie = movie;
    next();
  } catch (error) {
    next(error);
  }
});

routers.get("/", passport.authenticate("jwt", { session: false }), getAllMovie);
routers.post("/movieCreate", uploader.single("posterImage"), movieCreate);
routers.get("/movieById", getByMovieId);
module.exports = routers;
