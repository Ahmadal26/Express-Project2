const Movie = require("../../models/Movie");

// getAllMovie - a user can see a list of all movies -- working fine
// exports.getAllMovie = async (req, res, next) => {
//   try {
//     if (req.user.isStaff) {
//       const movies = await Movie.find();
//       res.status(200).json(movies);
//     } else {
//       res.status(401).json({ message: "you dont have staff permission" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// since a user -  no need to be staff
exports.getAllMovie = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(401).json({ message: " No Movies Found " });
  }
};

//a user can view movie details (name,actors,genre,releae date, rating, reviews) -- working fine
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

//5- movieCreate - a staff member, I can add new movies (name, actor, genre, release date) -- working fine
exports.movieCreate = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message: "You are not Admin and not authorized to create movie!",
        error,
      });
    }
    // replace to replace \\ in windows to / as used in nodejs
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
    const foundMovie = await Movie.findByIdAndDelete(req.body._id);

    if (!foundMovie) {
      return res.status(404).json({ message: " Movie not Found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//https://www.geeksforgeeks.org/mongoose-findbyidanddelete-function/
