const Review = require("../../models/Review");
const Movie = require("../../models/Movie");
const User = require("../../models/User");

// exports.getUserReview = async (req, res, next) => {
//   try {
//     {userId} = req.body
//   } catch (error) {
//     next(error);
//   }
// };

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
