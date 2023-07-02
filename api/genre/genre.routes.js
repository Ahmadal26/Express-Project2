const express = require("express");
const Genre = require("../../models/Genre");
const Movie = require("../../models/Movie");
const { createNewGenre } = require("./genre.controllers");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createNewGenre
);
module.exports = router;
