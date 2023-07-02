const express = require("express");
const {
  getReviews,
  fetchReview,
  createMovieReview,
} = require("./review.controllers");
const router = express.Router();
const passport = require("passport");

const signedIn = passport.authenticate("jwt", { session: false });
// Everything with the word review is a placeholder that you'll change in accordance with your project

router.param("reviewId", async (req, res, next, reviewId) => {
  try {
    const foundReview = await fetchReview(reviewId);
    if (!foundReview) return next({ status: 404, message: "Review not found" });
    req.review = foundReview;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", signedIn, getReviews);

router.post("/:movieId", signedIn, createMovieReview);

module.exports = router;
