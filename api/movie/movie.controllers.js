const Movie = require("../../models/Movie");
const Genre = require("../../models/Genre");
//6- a user can receive a list of movies
exports.getAllMovie = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};
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

//5- a user can create a movie -- working fine
exports.movieCreate = async (req, res, next) => {
  try {
    // need jwt passport to work
    if (!req.user.isStaff) {
      res.status(401).json({
        message: "You are not Admin and not authorized to create movie!",
        error,
      });
    }

    if (req.file) {
      // replace to replace \\ in windows to / as used in nodejs
      req.body.posterImage = req.file.path.replace("\\", "/");
    }

    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: " Error: Can not create a new Movie", error });
  }
};

//7- a user can update a movie by id
exports.movieUpdateById = async (req, res, next) => {
  try {
    const foundMovie = await Movie.findByIdAndUpdate(req.body._id);

    if (!foundMovie) {
      return res.status(404).json({ message: " Movie not Found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//8- a user can delete a movie by id
exports.movieDelete = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message: "You are not Admin and not authorized to delete movie!",
        error,
      });
    }
    const foundMovie = await Movie.findByIdAndDelete(req.body._id);

    if (!foundMovie) {
      return res.status(404).json({ message: " Movie not Found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// exports.addGenreToMovie = async (req,res,next) => {}
//https://www.geeksforgeeks.org/mongoose-findbyidanddelete-function/
