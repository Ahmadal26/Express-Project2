const Review = require("../../models/Review");
const Movie = require("../../models/Movie");
const User = require("../../models/User");
//const validateRating = require("../../middlewares/validateRating");

exports.fetchReview = async (tempId, next) => {
  try {
    const temp1 = await User.findById(tempId);
    return temp1;
  } catch (error) {
    return next(error);
  }
};
// route   GET /api/products
// any user can fetch all reviews
exports.getReviews = async (req, res, next) => {
  const reviews = await Review.find();
  return res.status(200).res.json(reviews);
};

// Fetch one review by its Id
// route   GET /api/reviews/:id

const getReviewById = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Product.findById(reviewId);

  if (review) {
    return res.status(200).res.json(review);
  } else {
    return res.status(404).json({ message: "Review not found" });
  }
};
// @desc    Create new review
// @route   POST /api/products/:id/reviews

exports.createMovieReview = async (req, res, next) => {
  const { rating, comment } = req.body;

  if (rating < 0 || rating > 10) {
    return res.status(400).json({ message: "Rating Ranges from 1-10" });
  }

  const { movieId } = req.params;
  const movie = await Movie.findById(movieId).populate("reviews");

  if (movie) {
    const alreadyReviewed = movie.reviews.find(
      (userReview) => userReview.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    // MovieSchema : reviews = array of objects
    movie.reviews.push(review);

    movie.numReviews = movie.reviews.length; // length of reviews array
    //calculate rating:
    movie.rating =
      movie.reviews.reduce(
        (accumulator, review) => accumulator + review.rating,
        0
      ) / movie.numReviews;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // const initialValue = 0;
    // const sumWithInitial = array1.reduce(
    // (accumulator, currentValue) => accumulator + currentValue,
    // initialValue
    //
    await movie.save();
    return res.status(201).json({ message: "Review added" });
  } else {
    return next(error);
  }
};
