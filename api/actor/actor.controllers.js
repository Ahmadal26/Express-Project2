const Actor = require("../../models/Actor");
const Movie = require("../../models/Movie");

// create new Actor
exports.createNewActor = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message: "You are not Admin and not authorized to add an actor!",
        error,
      });
    }

    const newActor = await Actor.create(req.body);
    res.status(201).json(newActor);
  } catch (error) {
    res.status(500).json({ message: " Error: Can not add an actor", error });
  }
};

// getAllActors -
exports.getAllActors = async (req, res, next) => {
  try {
    const actors = await Actor.find().populate("movies");
    res.json(actors);
  } catch (error) {
    next(error);
  }
};

// getActorById + populate related movies:
exports.getActorById = async (req, res, next) => {
  try {
    const { actorId } = req.params;
    const foundActor = await Actor.findById(actorId).populate("movies");
    if (!foundActor) {
      res.status(404).json({ message: "Actor not found" });
    } else {
      res.json(foundActor);
    }
  } catch (error) {
    next(error);
  }
};
// addActorToMovie -
exports.addActorToMovie = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message: "You are not Admin and not authorized to add actor to movie!",
        error,
      });
    }
    // one - to - many relation

    const { actorId, movieId } = req.params;

    // step 1: search if movie exist (many)
    const foundMovie = await Movie.findById(movieId);
    if (!foundMovie) {
      res.status(404).json({ message: "Movie not found, create it first" });
    }

    // step 2: search if actor exist (one)
    const foundActor = await Actor.findById(actorId);
    if (!foundActor) {
      res.status(404).json({ message: "Actor not found, create it first" });
    }

    // step 3: if both movie and actor found
    if (foundActor && foundMovie) {
      await Movie.findOneAndUpdate(req.movie._id, {
        $push: { actors: Actor._id }, //Actor as ref in Movie Model
      });
      await Actor.findOneAndUpdate(actorId, {
        $push: { movies: req.movie._id }, // movies as in Actor model
      });

      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};

// deleteActorFromMovie -
exports.deleteActorFromMovie = async (req, res, next) => {
  try {
    if (!req.user.isStaff) {
      res.status(401).json({
        message:
          "You are not Admin and not authorized to delete actor from movie!",
        error,
      });
    }
    // one - to - many relation

    const { actorId, movieId } = req.params;

    // step 1: search if movie exist (many)
    const foundMovie = await Movie.findById(movieId);
    if (!foundMovie) {
      res.status(404).json({ message: "Movie not found" });
    }

    // step 2: search if actor exist (one)
    const foundActor = await Actor.findById(actorId);
    if (!foundActor) {
      res.status(404).json({ message: "Actor not found" });
    }

    // step 3: if both movie and actor found
    if (foundActor && foundMovie) {
      await Movie.findOneAndDelete(req.movie._id, {
        $pull: { actors: Actor._id }, //Actor as ref in Movie Model
      });
      //   await Actor.findOneAndUpdate(actorId, {
      //     $push: { movies: req.movie._id }, // movies as in Actor model
      //   });

      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
};
