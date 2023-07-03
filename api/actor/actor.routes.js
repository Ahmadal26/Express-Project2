const express = require("express");
const {
  getAllActors,
  createNewActor,
  deleteActorFromMovie,
  fetchActor,
  addActorToMovie,
  getActorById,
} = require("./actor.controllers");
const router = express.Router();
const passport = require("passport");
const Actor = require("../../models/Actor");

// Everything with the word actor is a placeholder that you'll change in accordance with your project

router.param("actorId", async (req, res, next, actorId) => {
  try {
    const foundActor = await Actor.findById(actorId);
    if (!foundActor) return next({ status: 404, message: "Actor not found" });
    req.actor = foundActor;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", passport.authenticate("jwt", { session: false }), getAllActors);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createNewActor
);
router.delete("/:actorId", deleteActorFromMovie);
router.put(
  "/:actorId/:movieId",
  passport.authenticate("jwt", { session: false }),
  addActorToMovie
);

module.exports = router;
