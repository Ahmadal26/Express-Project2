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
routers.post(
  "/",
  uploader.single("posterImage"),
  passport.authenticate("jwt", { session: false }),
  movieCreate
);
routers.get("/:movieId", getByMovieId);
routers.delete("/:movieId", movieDelete);
routers.put("/:movieId", movieUpdateById);
module.exports = routers;
