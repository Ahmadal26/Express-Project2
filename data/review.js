import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Review from "../models/Review.js";

// @route   GET /api/products
// any user can fetch all reviews
exports.getReviews = async (req, res, next) => {
  const reviews = await Review.find();

  return res.status(200).res.json(reviews);
};

// Fetch one review
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

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById, createProductReview };
