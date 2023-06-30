const Movie = require("../../models/Movie");

exports.getAllMovie = async (req, res, next) => {
  try {
    if (req.user.isStaff) {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } else {
      res.status(401).json({ message: "you dont have staff permission" });
    }
  } catch (error) {
    next(error);
  }
};
// exports.getByMovieId = async (req, res, next) => {
//   try {
//     return res.status(200).json(req.movie);
//   } catch (error) {
//     return next(error);
//   }
// };
exports.getByMovieId = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const foundMovie = await Movie.findById(movieId);
    if (!foundMovie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.status(201).json(foundMovie);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.movieCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.posterImage = req.file.path.replace("\\", "/");
    }

    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res
      .status(500)
      .json({ message: " Error: Can not create a new Movie", error });
  }
};
