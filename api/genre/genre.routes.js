const express = require("express");
const Genre = require("../../models/Genre");
const Movie = require("../../models/Movie");
const { genreCreate } = require("./genre.controllers");
const router = express.Router();
const passport = require("passport");

router.post("/", passport.authenticate("jwt", { session: false }), genreCreate);
module.exports = router;
