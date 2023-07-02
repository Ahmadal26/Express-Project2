const Genre = require("../../models/Genre");
const Movie = require("../../models/Movie");

// create new Genre
exports.createNewGenre = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message: "You are not Admin and not authorized to add an genre!",
        error,
      });
    }

    const newGenre = await Genre.create(req.body);
    res.status(201).json(newGenre);
  } catch (error) {
    res.status(500).json({ message: " Error: Can not add an genre", error });
  }
};

// getAllGenres -
exports.getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find().populate("movies");
    res.json(genres);
  } catch (error) {
    next(error);
  }
};

// getGenreById + populate related movies:
exports.getGenreById = async (req, res, next) => {
  try {
    const { genrId } = req.params;
    const foundGenre = await Genre.findById(GenreId).populate("movies");
    if (!foundGenre) {
      res.status(404).json({ message: "Genre not found" });
    } else {
      res.json(foundGenre);
    }
  } catch (error) {
    next(error);
  }
};

// addActorToMovie -
exports.addMovieToGenre = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      return res.status(401).json({
        message:
          "You are not Admin and not authorized to add movie to A genre!",
        error,
      });
    }
    // one - to - many relation

    const { genreId, movieId } = req.params;

    // step 1: search if movie exist (many)
    const foundMovie = await Movie.findById(movieId);
    if (!foundMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // step 2: search if genre exist (one)
    const foundGenre = await Genre.findById(genreId);
    if (!foundGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    // step 3: if both movie and actor found
    if (foundGenre && foundMovie) {
      await Movie.findOneAndUpdate(req.movie._id, {
        $push: { genres: Genre._id }, //genres as ref in Movie Model
      });
      await Genre.findOneAndUpdate(genreId, {
        $push: { movies: req.movie._id }, // movies as in Genre model
      });

      return res.status(204).end();
    }
  } catch (error) {
    return next(error);
  }
};

// deleteActorFromMovie -
exports.deleteGenreFromMovie = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      return res.status(401).json({
        message: "You are not Admin and not authorized to delete genre!",
        error,
      });
    }
    // one - to - many relation

    const { genreId, movieId } = req.params;

    // step 1: search if movie exist (many)
    const foundMovie = await Movie.findById(movieId);
    if (!foundMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // step 2: search if genre exist (one)
    const foundGenre = await Actor.findById(genreId);
    if (!foundGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    // step 3: if both movie and genre found
    if (foundGenre && foundMovie) {
      await Movie.findOneAndDelete(req.movie._id, {
        $pull: { genres: Genre._id }, // genres as ref in Movie Model
      });
      //   await Actor.findOneAndUpdate(actorId, {
      //     $push: { movies: req.movie._id }, // movies as in Actor model
      //   });

      return res.status(204).end();
    }
  } catch (error) {
    return next(error);
  }
};
